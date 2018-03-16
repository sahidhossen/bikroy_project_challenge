# Bikroy.com Project Challenge 
## About The Project

‘xyz’ is a software development company, annual performance reviews are a key
component of employee development. Please design a web application that allows
employees to submit feedback toward each other&#39;s performance review.

## Key Feature

#### Following functionalities should be available while admin logged in to dashboard.
-  Add/remove/update/view employees
-  Add/update/view performance reviews
-  Assign employees to participate in another employee's performance review

#### Assign employees to participate in another employee's performance review
- 	List of performance reviews requiring feedback
- 	Submit feedback

# Technology 

- **Laravel 5.5 [(doc)](https://laravel.com/docs/5.5)**
- **Laravel/Passport** (For API Development - [doc](https://laravel.com/docs/5.5/passwords) )
- **Entrust** (For Role Based Permission - [doc](https://github.com/Zizaco/entrust) )
- **MYSQL 5.6**
- **NodeJS 8.4**
- **ReactJS**
- **Redux**
- **React-router-dom**
- **SCSS**
- **Bootstrap 4**


# Installation

1. For setup this project you have to clone this git repo from this url 
    ```
    git clone https://github.com/sahidhossen/bikroy_project_challenge.git
    ```
2. Then run the bellow command for install the nodejs packages. *(Make sure you have install nodejs in your computer)*
     ```
     npm install
    ```
3. Run the command bellow to download the laravel packages. 
    ```
    composer install
    ```
4. Create a database and setup the **.env** file with your database connection. Then run the bellow command for migrate the database and seeds the demo user.
    ```
    php artisan migrate:refresh --seed
    ```
    This command will create a company and user with admin permission
    ```
    useremail: xyz@mail.com
    password: admin123
    ```
    
5. For the best practice create a local virtual host for this project. **(Example: app.xyz )**   
    - Windows Tutorial [link](http://foundationphp.com/tutorials/apache_vhosts.php)
    - Mac Tutorial [link](https://coolestguidesontheplanet.com/set-virtual-hosts-apache-mac-osx-10-9-mavericks-osx-10-8-mountain-lion/)
    
## Note

Please follow the documentation that I have attached with the email. If you need any farther information please email me. 

**Thanks**
    
