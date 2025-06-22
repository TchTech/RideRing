from fastapi import APIRouter, Depends
from database_worker import get_async_session
from sqlalchemy import *

from bd_tables import CARS
from models import Car


car_router = APIRouter (tags = ["Cars"], prefix = "/cars") # Роутер машин.
# tags - это просто название группы
# prefix - это название запроса (адрес короче)

@car_router.get ("/all_cars")
async def get_all_cars (session = Depends (get_async_session)):
    query = select (CARS) # Вбиваю нужную таблицу. Тут таблица с машинами.
    result = await session.execute (query) # Получаю промежуточный результат запроса.
    return result.fetchall ( ) # Получаю все элементы запроса.


@car_router.get ("/car")
async def get_car (owner_id: int, session = Depends (get_async_session)):
    query = select (CARS).where (CARS.c.owner_id == owner_id) # Здесь уже указать условие выбора
    result = await session.execute (query)
    return result.fetchall ( )


@car_router.post ("/car")
async def add_new_car (new_car: Car, session = Depends (get_async_session)):
    stmt = insert (CARS).values (**new_car.dict()) # Вбиваю таблицу, КУДА будут заносится данные.
    # Распаковываю словарь с новой машиной и передаю его в values (всё как в pgAdmin).
    await session.execute (stmt) # Отправляю запрос сессии на добавление данных
    await session.commit ( ) # ПОДТВЕРЖДАЮ выполнение всех запросов на добавление данных
    return "Всё круто, новая машина добавлена!"