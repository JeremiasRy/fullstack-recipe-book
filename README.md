# fullstack-recipe-book

mongoDb database/node/react

This is a recipe book with a few extra functions.
It uses MongoDB database to store user and recipe data.
It has basic security with login system, I used bcrypt to hash the passwords so no actual passwords are stored in database.
Maybe not the most bulletproof system but it's still something!

The "cool" function of this app is the adjust feature.
Let's say you have too little of some ingredient just input your amount to the program and it calculates everything for you 
(or if you have too much and don't want to store some arbitrary amount of something in your fridge)

(The feature is built in 'recipe' component under adjustRecipe.)

It has quite a lot of features in editing recipe (Like changing amounts and adding/removing ingredients) 

The recipe component is quite large and maybe would have been better to split it into own files and components but I think the app works really good this way
(Of course many things could be improved)

This is the first app I tried implimenting the material UI and got the app to look a bit nicer than usual. Notifications work ok and are informative.

The backend is really simple
There is a unique username check.

I added a token checker for the program to check if the session is still running if not it will log you out immediatly (rather than just informing you that your session has expired) frontend sends a request and backend responses with valid token or "false".

Fixed also some backend crashing issues when token expires.. Problem was with my error handling and now it works but the code got a bit messier..
Next time I will build much more rigid error handling. (Maybe I'll build this app again when I have the time)

If you want to try how it works just sign up, ass a recipe and start adjusting!
(Or just press log in if you don't care to register)

(there is a heroku link in description)
