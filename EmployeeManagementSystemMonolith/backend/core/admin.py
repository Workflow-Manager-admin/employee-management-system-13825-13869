from django.contrib import admin
from .models import User, Employee, Attendance, Payroll

admin.site.register(User)
admin.site.register(Employee)
admin.site.register(Attendance)
admin.site.register(Payroll)
