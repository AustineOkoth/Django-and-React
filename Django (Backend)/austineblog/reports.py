import reporting
from django.db.models import Sum, Avg, Count
from .models import Post

class PersonReport(reporting.Report):
    model = Post
    verbose_name = 'Blog Report'
    annotate = (                    # Annotation fields (tupples of field, func, title)
        ('id', Count, 'Total'),     # example of custom title for column
        ('salary', Sum),            # no title - column will be "Salary Sum"
        ('expenses', Sum),
    )
    aggregate = (                   # columns that will be aggregated (syntax the same as for annotate)
        ('id', Count, 'Total'),
        ('salary', Sum, 'Salary'),
        ('expenses', Sum, 'Expenses'),
    )
    group_by = [                   # list of fields and lookups for group-by options
        'department',
        ('department','occupation'), # If a tupple is defined would group by all fields in the tupple
        'department__leader',
        'occupation',
    ]
    list_filter = [                # This are report filter options (similar to django-admin)
       'occupation',
       'country',
    ]

    # if detail_list_display is defined user will be able to see how rows was grouped
    detail_list_display = [
        'name',
        'salary',
        'expenses',
    ]

    date_hierarchy = 'birth_date' # the same as django-admin


reporting.register('people', PersonReport) # Do not forget to 'register' your class in reports