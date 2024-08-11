"""DB connector."""

import os
import pandas as pd
from dotenv import load_dotenv
import numpy as np
import datetime as dt

from sqlalchemy import create_engine

from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, JSON
from sqlalchemy.orm import sessionmaker

PREFIX = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(PREFIX, 'estate.db')
engine = create_engine(f'sqlite:///{db_path}')

load_dotenv()

SHEET_ID = os.getenv('SHEET_ID')
G_IDS = ['959471842', '299460191']

EXPORT_URL = 'https://docs.google.com/spreadsheets/d/{id}/export?gid={gid}&format=csv'


Base = declarative_base()
Session = sessionmaker(bind=engine)


class Estate(Base):
    __tablename__ = 'estate'
    id = Column(Integer, primary_key=True)
    owner = Column(String, nullable=False)
    name = Column(String)
    geometry = Column(JSON)
    
    def __repr__(self):
        return f'[{self.id}]: {self.owner} - {self.name}'


class Storage:
    def __init__(self, _id, gid):
        """Gets orders from gsheet file or from csv.
        """
        url = EXPORT_URL.format(id=_id, gid=gid)
        df = pd.read_csv(url, index_col=0).reset_index()
        df = df.rename(str.lower, axis='columns')
        df = df.rename(str.strip, axis='columns')
        self.df = df
    
Base.metadata.create_all(engine)