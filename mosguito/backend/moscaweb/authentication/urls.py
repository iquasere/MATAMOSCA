from django.urls import path

from .views import (GetCSRFToken, SignupView, LoginView, 
                    AuthLoginView, LogoutView, DeleteUserView, 
                    CheckAuthenticatedView, GetUserView,  
                    ActivationView, PasswordRecoveryView, 
                    PasswordUpdateView, UpdateUserInfoView, UpdateUsernameView)

urlpatterns = [
    path("csrf_cookie", GetCSRFToken.as_view()),
    path("register", SignupView.as_view()),
    path("login", LoginView.as_view()),
    path("authlogin", AuthLoginView.as_view()),
    path("logout", LogoutView.as_view()),
    path("delete", DeleteUserView.as_view()),
    path("authenticated", CheckAuthenticatedView.as_view()),
    path("user", GetUserView.as_view()),
    path("activation/<uidb64>/<token>", ActivationView.as_view(), name="activation"),
    path("password-recovery", PasswordRecoveryView.as_view()),
    path("password-update/<uidb64>/<token>", PasswordUpdateView.as_view()),
    path("update-user-info", UpdateUserInfoView.as_view()),
    path("update-username", UpdateUsernameView.as_view()),
    ]