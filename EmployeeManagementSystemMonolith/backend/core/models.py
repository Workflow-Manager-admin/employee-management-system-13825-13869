from django.db import models
from django.contrib.auth.models import AbstractUser

# PUBLIC_INTERFACE
class User(AbstractUser):
    """
    Custom user model for employees and HR.
    (Extensible for profiles/roles as needed)
    """
    email = models.EmailField(unique=True)
    # Add any extra fields here (role, phone, etc)

    def __str__(self):
        return self.username

# PUBLIC_INTERFACE
class Employee(models.Model):
    """
    Employee model for core HR records.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee_profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    join_date = models.DateField()
    position = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default='active')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# PUBLIC_INTERFACE
class Attendance(models.Model):
    """
    Attendance record for employees.
    """
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    check_in = models.TimeField()
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=32, choices=(
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('on_leave', 'On Leave'),
    ), default='present')

    def __str__(self):
        return f"{self.employee} {self.date} {self.status}"

# PUBLIC_INTERFACE
class Payroll(models.Model):
    """
    Payroll record for employees.
    """
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='payroll_records')
    period_start = models.DateField()
    period_end = models.DateField()
    amount_gross = models.DecimalField(max_digits=10, decimal_places=2)
    amount_net = models.DecimalField(max_digits=10, decimal_places=2)
    paid_on = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=32, choices=(
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    ), default='pending')

    def __str__(self):
        return f"{self.employee} {self.period_start}-{self.period_end}: {self.status}"
