from rest_framework import serializers
from .models import User, Employee, Attendance, Payroll

# PUBLIC_INTERFACE
class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

# PUBLIC_INTERFACE
class EmployeeSerializer(serializers.ModelSerializer):
    """Serializer for Employee model."""
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='user')

    class Meta:
        model = Employee
        fields = ['id', 'user', 'user_id', 'first_name', 'last_name', 'join_date', 'position', 'department', 'status']

# PUBLIC_INTERFACE
class AttendanceSerializer(serializers.ModelSerializer):
    """Serializer for Attendance model."""
    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'date', 'check_in', 'check_out', 'status']

# PUBLIC_INTERFACE
class PayrollSerializer(serializers.ModelSerializer):
    """Serializer for Payroll model."""
    class Meta:
        model = Payroll
        fields = ['id', 'employee', 'period_start', 'period_end', 'amount_gross', 'amount_net', 'paid_on', 'status']
