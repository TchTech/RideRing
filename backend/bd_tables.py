from sqlalchemy import *
from datetime import datetime


# Здесь находятся образцы таблиц в БД


metadata = MetaData ( ) # Создание метаданных


# Роли пользователя в БД
THE_ROLES_OF_A_USER = Table (
	"the_roles_of_a_user",
	metadata,
	Column ("role", String, primary_key = True, nullable = False)
)


# Пользователи в БД
USERS = Table (
	"users",
	metadata,
	Column ("id", Integer, primary_key = True),
	Column ("first_name", String, nullable = False),
	Column ("middle_name", String, nullable = False),
	Column ("last_name", String, nullable = False),
	Column ("link_to_photo", String),
	Column ("phone_number", String, nullable = False),
	Column ("registered_at", TIMESTAMP, default = datetime.utcnow), # Передаётся сама функция, но не её результат
	Column ("current_role", String, ForeignKey (THE_ROLES_OF_A_USER.c.role)), # Это значит, что это поле ссылается на поле из другой таблицы
	Column ("password", String, nullable = False),
	Column ("is_active", Boolean, default = True),
	Column ("is_superuser", Boolean, default = False),
	Column ("is_verified", Boolean, default = False)
)


# Машины в БД
CARS = Table (
	"cars",
	metadata,
	Column ("owner_id", Integer, primary_key = True),
	Column ("brand", String, nullable = False),
	Column ("model", String, nullable = False),
	Column ("comfort_level", Integer, nullable = False),
	Column ("for_kids", Boolean, nullable = False)
)


# Маршруты в БД
ROUTES = Table (
	"routes",
	metadata,
	Column ("route_id", Integer, primary_key = True),
	Column ("status", String, nullable = False),
	Column ("creator_id", Integer, nullable = False),
	Column ("user_role", String, nullable = False),
	Column ("cost", Float, nullable = False),
	Column ("public_at", TIMESTAMP, default = datetime.utcnow),
	Column ("time_of_leaving", TIMESTAMP, nullable = False),
	Column ("place_of_leaving", String, nullable = False),
	Column ("place_of_arrival", String, nullable = False),
	Column ("grade", Integer),
	Column ("comments", Text)
)