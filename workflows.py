from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Workflow)
def create_workflow(workflow: schemas.WorkflowCreate, db: Session = Depends(get_db)):
    return crud.create_workflow(db=db, workflow=workflow)

@router.get("/", response_model=List[schemas.Workflow])
def read_workflows(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    workflows = crud.get_workflows(db, skip=skip, limit=limit)
    return workflows
