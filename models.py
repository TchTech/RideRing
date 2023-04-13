from pydantic import BaseModel
from enum import Enum, IntEnum
from datetime import datetime
from typing import List, Literal


# Здесь лежат схемы для валидации данных


# Роли пользователя
class RolesOfUser (Enum):
	DRIVER = "driver"
	PASSANGER = "passanger"


# Уровни комфорта машины
class ComfortLevelsOfCar (IntEnum):
	ECONOMY = 1
	COMFORT = 2
	LUXURY = 3


# Состояния маршрута
class StatesOfRoute (Enum):
	FREE = "free"
	TAKED = "taked"
	ENDED = "ended"


# Оценки (количество звёзд)
class Grades (IntEnum):
	ONE_STAR = 1
	TWO_STARS = 2
	THREE_STARS = 3
	FOUR_STARS = 4
	FIVE_STARS = 5



# Пользователь
class User (BaseModel):
	id: int
	first_name: str # Имя
	middle_name: str # Отчество
	last_name: str # Фамилия
	link_to_photo: str
	phone_number: str
	registered_at: datetime
	current_role: Literal["driver", "passanger"]
	password: str # Захешированный пароль


# Машина
class Car (BaseModel):
	owner_id: int
	brand: str
	model: str
	comfort_level: ComfortLevelsOfCar
	for_kids: bool # Есть ли детское кресло


# Комментарий
class Comment (BaseModel):
	user_id: int
	comment: str


# Маршрут
class Route (BaseModel):
	route_id: int
	status: Literal["free", "taked", "ended"]
	creator_id: int
	user_role: Literal["driver", "passanger"]
	cost: float
	public_at: datetime
	time_of_leaving: datetime
	place_of_leaving: str
	place_of_arrival: str
	grade: Grades
	comments: Comment