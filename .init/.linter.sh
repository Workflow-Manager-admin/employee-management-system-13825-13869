#!/bin/bash
cd /tmp/kavia/workspace/code-generation/employee-management-system-13825-13869/EmployeeManagementSystemMonolith
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

