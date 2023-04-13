from fastapi import APIRouter, Depends
from database_worker import get_async_session
from sqlalchemy import *
from typing import Optional

from bd_tables import ROUTES
from models import Route


route_router = APIRouter (tags = ["Routes"], prefix = "/routes")

@route_router.get ("/all_routes")
async def get_all_routes (session = Depends (get_async_session)):
    query = select (ROUTES) # Вбиваю нужную таблицу.
    result = await session.execute (query) # Получаю промежуточный результат запроса.
    return result.fetchall ( ) # Получаю все элементы запроса.


@route_router.get ("/route")
async def get_route (route_id: Optional[int] = None,
                     creator_id: Optional[int] = None,
                     session = Depends (get_async_session)):
    if route_id:
        query = select (ROUTES).where (ROUTES.c.route_id == route_id)
    elif creator_id:
        query = select (ROUTES).where (ROUTES.c.creator_id == creator_id)
    else:
        raise TypeError ("Не введены аргументы функции!")
    result = await session.execute (query)
    return result.fetchall ( )


@route_router.post ("/route")
async def add_new_route (new_route: Route, session = Depends (get_async_session)):
    stmt = insert (ROUTES).values (**new_route.dict())
    await session.execute (stmt)
    await session.commit ( )
    return "Всё круто, новый маршрут добавлен!"