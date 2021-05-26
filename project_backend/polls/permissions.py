from rest_framework import permissions

class CanVote(permissions.BasePermission):
    message = 'You are not allowed to vote.'
    
    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.validity