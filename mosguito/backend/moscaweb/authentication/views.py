import json

from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .utils import token_generator


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = request.data

        username = data['username']
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        password1 = data['password1']
        password2 = data['password2']

        try:
            if password1 == password2:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password1) < 6:
                        return Response({'error': 'Password must be at least 6 characters'})
                    else:
                        user = User.objects.create_user(username=username, password=password1, first_name=first_name,
                                                        last_name=last_name, email=email)

                        user.is_active = False
                        user.save()

                        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                        domain = get_current_site(request).domain
                        token = token_generator.make_token(user)
                        link = "/activation/" + str(uidb64) + "/" + str(token)
                        activation_url = str(domain) + str(link)

                        format_dictionary = {'name': first_name, 'url': activation_url}

                        message = "Dear {name},\n\nWelcome to the Strain Design DataBase. \n\nYour " \
                                  "registration at MOSGUITO is almost complete. The next step is for you to activate " \
                                  "the account which can be done through the following link:\n\n{url}\n\n" \
                                  "Kind regards,\n\nThe MOSGUITO Team.".format(**format_dictionary)

                        try:
                            email_message = EmailMessage(
                                subject="MOSGUITO Account",
                                body=message,
                                to=[email]
                            )
                            email_message.send(fail_silently=False)

                            return Response({'success': 'User created successfully'})

                        except Exception:

                            if User.objects.filter(username=username).exists():
                                user = User.objects.filter(username=username)[0]
                                User.objects.filter(id=user.id).delete()

                            return Response({'error': 'It was not possible to send the confirmation email. '
                                                      'Please verify the email field.'})
            else:
                return Response({'error': 'Passwords do not match'})

        except Exception:

            if User.objects.filter(username=username).exists():
                user = User.objects.filter(username=username)[0]
                User.objects.filter(id=user.id).delete()

            return Response({'error': 'Something went wrong when registering account'})


class ActivationView(APIView):

    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({"success": "The user account was successfully validated"})
        else:
            return Response({"error": "Something went wrong when validating the user account"})


class PasswordRecoveryView(APIView):

    def post(self, request):

        username = request.data["username"]

        if User.objects.filter(username=username).exists():

            user = User.objects.filter(username=username)[0]

            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            domain = get_current_site(request).domain
            token = token_generator.make_token(user)
            link = "/password-update/" + str(uidb64) + "/" + str(token)
            activation_url = str(domain) + str(link)

            format_dictionary = {'name': user.first_name, 'url': activation_url}

            message = "Dear {name},\n\nYour password recovery request is almost complete. You can set your new password " \
                      "through the following link:\n\n{url}\n\nKind regards,\n\nThe MOSGUITO Team.".format(**format_dictionary)

            try:
                email_message = EmailMessage(
                    subject="MOSGUITO Password Recovery",
                    body=message,
                    to=[user.email]
                )
                email_message.send(fail_silently=False)

                return Response({'success': 'The email for the password update was successfully sent'})

            except Exception:
                if User.objects.filter(username=username).exists():
                    user = User.objects.filter(username=username)[0]
                    User.objects.filter(id=user.id).delete()
                return Response({'error': 'It was not possible to send the email for the password update.'})

        else:
            return Response({'error': 'There is no user registered with that username.'})


class PasswordUpdateView(APIView):

    def post(self, request, uidb64, token):

        password1 = request.data["password1"]
        password2 = request.data["password2"]

        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and token_generator.check_token(user, token):
            if password1 == password2:
                if len(password1) < 6:
                    return Response({"error": "Password must be at least 6 characters"})
                else:
                    user_ = User.objects.filter(username=user.username)[0]
                    user_.set_password(password1)
                    user_.save()
                    return Response({"success": "Password successfully changed"})
            else:
                return Response({"error": "Passwords do not match"})
        else:
            return Response({"error": "Something went wrong when updating the password"})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated'})
            else:
                user_ = User.objects.filter(username=username)[0]
                if User.objects.filter(username=username).exists():
                    if not user_.is_active:
                        return Response({'error': 'Your account has not been activated. Please check your email for '
                                                  'the activation instructions and then try again.',
                                         'activation_failed': ''})
                    elif user_.password != password:
                        return Response({'error': 'Wrong password. Please try again.', 'wrong_password': ''})
                return Response({'error': 'Error Authenticating'})
        except:

            if not User.objects.filter(username=username).exists():
                return Response({'error': 'The username provided is not registered.'})
            else:
                return Response({'error': 'Something went wrong when logging in'})

@method_decorator(csrf_protect, name='dispatch')
class AuthLoginView(APIView):

    def post(self, request, format=None):
        try:
            data = request.data

            email = data['email']
            first_name = data['first_name']
            last_name = data['last_name']

            # check if the user already exists, 
            # if not create a new user

            if User.objects.filter(email=email).exists():
                user = User.objects.filter(username=email)[0]
            else:
                user = User.objects.create_user(username=email, 
                                                first_name=first_name,
                                                last_name=last_name,
                                                email=email)
                user.is_active = True
                user.save()
            auth.login(request, user)
            return Response({'success': 'User authenticated'})
        except Exception:
            return Response({'error': 'Something went wrong when logging in'})
        

@method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Logout Out'})
        except:
            return Response({'error': 'Something went wrong when logging out'})


@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):

    def get(self, request, format=None):
        user = request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


@method_decorator(csrf_protect, name='dispatch')
class DeleteUserView(APIView):

    def delete(self, request, format=None):
        user = request.user

        try:
            # Pre-deletion tasks
            
            #
            user = User.objects.filter(id=user.id)[0]
            user.delete()

            return Response({'success': 'User deleted successfully'})

        except Exception:
            return Response({'error': 'Something went wrong when trying to delete user'})


class GetUserView(APIView):
    def get(self, request, format=None):
        try:
            req_user = request.user
            username = req_user.username

            response = {}
            users = User.objects.filter(username=username)
            for user in users:
                response = {"first_name": user.first_name,
                            "last_name": user.last_name,
                            "email": user.email,
                            "username": user.username}

            return Response(response)
        except:
            return Response({'error': 'Something went wrong when retrieving user information'})


@method_decorator(csrf_protect, name='dispatch')
class UpdateUserInfoView(APIView):
    def put(self, request, format=None):
        try:
            user = request.user
            data = request.data

            first_name = data['first_name']
            last_name = data['last_name']

            User.objects.filter(username=user.username).update(first_name=first_name, last_name=last_name)

            return Response({"success": "User profile successfully updated"})

        except Exception:
            return Response({"error": "Something went wrong when updating profile"})


@method_decorator(csrf_protect, name='dispatch')
class UpdateUsernameView(APIView):

    def put(self, request, format=None):
        try:
            user = request.user
            data = request.data

            username = data['username']

            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'})
            else:
                User.objects.filter(username=user.username).update(username=username)

            return Response({"success": "Username successfully updated"})

        except Exception:
            return Response({"error": "Something went wrong when updating the username"})
