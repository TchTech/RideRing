from fastapi import FastAPI

from car_router import car_router
from user_router import user_router
from route_router import route_router


app = FastAPI (title = "Driver2") # Само приложение, на котором всё держится

app.include_router (car_router) # Обязательно включаем роутер в главное приложение.
app.include_router (user_router)
app.include_router (route_router)