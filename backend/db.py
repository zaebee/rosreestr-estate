"""DB connector."""

import os
from sqlalchemy import create_engine

from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, JSON
from sqlalchemy.orm import sessionmaker

PREFIX = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(PREFIX, 'estate.db')
engine = create_engine(f'sqlite:///{db_path}')

Base = declarative_base()

class Estate(Base):
    __tablename__ = 'estate'
    id = Column(Integer, primary_key=True)
    owner = Column(String, nullable=False)
    name = Column(String)
    geometry = Column(JSON)
    
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)