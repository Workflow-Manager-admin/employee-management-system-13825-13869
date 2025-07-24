from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import User, Employee, Attendance, Payroll
from .serializers import UserSerializer, EmployeeSerializer, AttendanceSerializer, PayrollSerializer

# PUBLIC_INTERFACE
class UserViewSet(viewsets.ModelViewSet):
    """CRUD API for users."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# PUBLIC_INTERFACE
class EmployeeViewSet(viewsets.ModelViewSet):
    """CRUD API for employees."""
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# PUBLIC_INTERFACE
class AttendanceViewSet(viewsets.ModelViewSet):
    """CRUD API for attendance records."""
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# PUBLIC_INTERFACE
class PayrollViewSet(viewsets.ModelViewSet):
    """CRUD API for payroll records."""
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
