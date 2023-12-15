checklist:
1ST
file-new-spring starter project
name project, type = Maven, java version 17, packaging War, language java
group: com.kristine.projectname -> copy/paste to package
select dev tools & spring web

2ND
pm.xml file -> bring in all dependencies

3RD
src/main/resources -> application.properties -> bring in prefix, hidden method filter & MySQL connection
declare schema: example_db
MySQL workbench: create new schema, copy/paste schema name

4TH
create package structure in src/main/java
right click on entry point package
com.kristine.example.controllers
com.kristine.example.models
com.kristine.example.repositories
com.kristine.example.services   

5TH
src/main/webapp -> create WEB-INF folder

6TH
models: 
new -> class -> User, LoginUser
check relationships: one to many/many to many

repositories: 
new -> interface -> UserRepository

services:
new -> class -> ExampleService.java -> 5 sacred methods of CRUD
UserService -.userservicesetup

controllers:
new -> class -> UserController, HomeController

7TH
WEB-INF:

linting issue fix: right click on app -> properties -> project facets -> dynamic web module 2.5 -> 5.0 -> apply & close -> cut/paste

main/user/example in WEB-INF

main:
dashboard.jsp

user:
loginReg.jsp

example:
create.jsp, showOne.jsp, edit.jsp