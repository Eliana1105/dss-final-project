"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from website.views import *
from django.conf.urls import url
from mysite import settings
from django.views.static import serve



urlpatterns = [
    url(r'^static/(?P<path>.*)$',serve,{'document_root':settings.STATIC_ROOT},name='static'),
    path('index/', index),
    path('login/', login),
    path('member_logout/', member_logout),
    path('corpus_list_ch/', corpus_list_ch),
    path('corpus_list_en/', corpus_list_en),
    path('corpus_process_ch/', corpus_process_ch),
    path('corpus_process_en/', corpus_process_en),
    path('corpus_resource_ch/', corpus_resource_ch),
    path('corpus_resource_en/', corpus_resource_en),
    path('corpus1_ch/', corpus1_ch),
    path('corpus1_en/', corpus1_en),
    path('corpus2_ch/', corpus2_ch),
    path('corpus2_en/', corpus2_en),
    path('corpus3_ch/', corpus3_ch),
    path('corpus3_en/', corpus3_en),
    path('corpus4_ch/', corpus4_ch),
    path('corpus4_en/', corpus4_en),
    path('corpus5_ch/', corpus5_ch),
    path('corpus5_en/', corpus5_en),
    path('resources_ch/', resources_ch),
    path('resources_en/', resources_en),
    path('search_ch/', search_ch),
    path('search_en/', search_en),
    path('search2_ch/', search2_ch),
    path('search2_en/', search2_en),
    path('signin_ch/', signin_ch),
    path('signin_en/', signin_en),
    path('account_ch/', account_ch),
    path('account_en/', account_en),
    path('apply_ch/', apply_ch),
    path('apply_en/', apply_en),
    path('copyright_ch/', copyright_ch),
    path('copyright_en/', copyright_en),
    path('guide_ch/', guide_ch),
    path('guide_en/', guide_en),
    path('forgotpw_ch/', forgotpw_ch),
    path('forgotpw_en/', forgotpw_en),
    path('backend_index/', backend_index),
    path('backend_record/', backend_record),
    path('backend_corpus/', backend_corpus),
    path('backend_account/', backend_account),
    path('backend_manual/', backend_manual),
    path('backend_license/', backend_license),
    path('backend_resource/', backend_resource),
    path('backend_login/', backend_login),
    path('backend_logout/', backend_logout),
    path('backend_download_corpus/', backend_download_corpus),
    path('backend_update_corpus/', backend_update_corpus),
    path('backend_delete_corpus/', backend_delete_corpus),
    path('backend_Get_user_log/', backend_Get_user_log),
    path('backend_check_email/', backend_check_email),
    path('backend_check_account/', backend_check_account),
    path('backend_create_account/', backend_create_account),
    path('backend_Get_user/', backend_Get_user),
    path('backend_Modify_user/', backend_Modify_user),
    path('backend_Delete_user/', backend_Delete_user),
    path('backend_Notice_user/', backend_Notice_user),
    path('backend_get_userdata/', backend_get_userdata),
    path('backend_get_user_license/', backend_get_user_license),
    path('backend_update_speaker/', backend_update_speaker),
    path('backend_download_speaker/', backend_download_speaker),
    path('backend_delete_speaker/', backend_delete_speaker),
    path('backend_new_resource/', backend_new_resource),
    path('backend_get_resource/', backend_get_resource),
    path('backend_delete_resource/', backend_delete_resource),
    path('download_resource/', download_resource),
    path('download_pdf/', download_pdf),
    path('send_password/', send_password),
    path('upload_application/', upload_application),
    path('apply_confirm/', apply_confirm),
    path('search_corpus/', search_corpus),
    path('search_MHcorpus/', search_MHcorpus),
    path('account_detail/', account_detail),
    path('Modify_account/', Modify_account),
    path('Modify_password/', Modify_password),
    path('log_search/', log_search),
]