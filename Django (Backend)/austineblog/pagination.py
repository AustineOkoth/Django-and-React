###I AM YET TO IMPLEMENT THIS PAGE...STAY STUNED





def paginate(data, page_size, page_number):
    start_index = (page_number - 1) * page_size
    end_index = page_number * page_size
    paginated_data = data[start_index:end_index]
    has_next_page = end_index < len(data)
    return paginated_data, has_next_page

data = list(range(100))

page_size = 10
page_number = 1

paginated_data, has_next_page = paginate(data, page_size, page_number)

print(paginated_data) # prints [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(has_next_page) # prints True

if has_next_page is True :
    page_number += 1
    paginated_data, has_next_page = paginate(data, page_size, page_number)

    print(paginated_data) # prints [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    print(has_next_page) # prints True
    
    
if has_next_page is True :
    page_number += 1
    paginated_data, has_next_page = paginate(data, page_size, page_number)

    print(paginated_data) # prints [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    print(has_next_page) # prints True


