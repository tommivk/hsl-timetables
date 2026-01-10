package main

import (
	"database/sql"
	"log"
)

type DBService struct{}

type Timetable struct {
	Id   string
	Name string
	Src  string
}

func (d *DBService) AddTimetable(name, src string) {
	db, err := sql.Open("sqlite3", "./timetables.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	_, err = db.Exec("INSERT INTO timetables(name, src) VALUES(?, ?)", name, src)
	if err != nil {
		log.Fatal(err)
	}
}

func (d *DBService) GetTimetables() []Timetable {
	db, err := sql.Open("sqlite3", "./timetables.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	rows, err := db.Query("SELECT * FROM timetables")
	if err != nil {
		log.Fatal(err)

	}
	defer rows.Close()

	var timetables []Timetable

	for rows.Next() {
		var timetable Timetable
		err := rows.Scan(&timetable.Id, &timetable.Name, &timetable.Src)
		if err != nil {
			log.Fatal(err)
		}
		timetables = append(timetables, timetable)
	}

	return timetables
}

func (d *DBService) DeleteTimetable(id string) {
	db, err := sql.Open("sqlite3", "./timetables.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	_, err = db.Exec("DELETE FROM timetables WHERE id=?", id)
	if err != nil {
		log.Fatal(err)
	}
}
