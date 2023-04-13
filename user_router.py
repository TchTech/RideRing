from fastapi import APIRouter, Depends
from database_worker import get_async_session
from sqlalchemy import *

from bd_tables import USERS
from models import User


user_router = APIRouter (tags = ["Users"], prefix = "/users")

@user_router.get ("/all_users")
async def get_all_users (session = Depends (get_async_session)):
	query = select (USERS)
	result = await session.execute (query)
	return result.fetchall ( )


@user_router.get ("/user")
async def get_user (user_id: int, session = Depends (get_async_session)):
	query = select (USERS).where (USERS.c.id == user_id)
	result = await session.execute (query)
	return result.fetchall ( )


@user_router.post ("/user")
async def add_new_user (new_user: User, session = Depends (get_async_session)):
	stmt = insert (USERS).values (**new_user.dict())
	await session.execute (stmt)
	await session.commit ( )
	return "Всё круто, новый пользователь добавлен!"