# fullstack-recipe-book

This is a recipe book with a few extra functions.
It uses MongoDB database to store user and recipe data.
It has basic security with login system, I used bcrypt to hash the passwords so no actual passwords are stored in database.
Maybe not the most bulletproof system but it's still something!

The "cool" function of this app is the adjust feature.
Let's say you have too little of some ingredient just input your amount to the program and it calculates everything for you 
(or if you have too much and don't want to store some arbitrary amount of something in your fridge)

(The feature is built in 'recipe' component under adjustRecipe.)

It has quite a lot of features in editing recipe (Like changing amounts and adding/removing ingredients) 
But everything works nicely and fast with the backend!

The recipe component is quite large and maybe would have been better to split it into own files and components but I think the app works really good this way
(Of course many things could be improved)

This is the first app I tried implimenting the material UI and got the app to look a bit more professional. Notifications work nicely and are informative.
Error handling is much better than in my last app.

The backend is really simple so not too much to it error handling as I said is better than last time and I got the code a bit more organized. 
Still a lot more to improve on that part.
