package main

import (
	"io"
	"net/http"
	"os"
	"sync"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

var mu sync.Mutex

type State struct {
	// Can be play or pause
	Status string  `json:"status"`
	Time   float64 `json:"time"`
}

var state State

func main() {
	state.Status = "pause"
	state.Time = 0.0
	e := echo.New()
	e.GET("/status", GetStatus)
	e.POST("/status", SetStatus)
	e.POST("/video", SaveVideo)

	// Start server.
	zap.S().Fatal(e.Start(":8080"))
}

func GetStatus(ec echo.Context) error {
	mu.Lock()
	defer mu.Unlock()
	return ec.JSON(http.StatusOK, state)
}

func SetStatus(ec echo.Context) error {
	reqState := new(State)
	if err := ec.Bind(reqState); err != nil {
		return err
	}
	mu.Lock()
	state = *reqState
	defer mu.Unlock()
	return ec.JSON(http.StatusNoContent, nil)
}

func SaveVideo(ec echo.Context) error {
	// Source
	file, err := ec.FormFile("file")
	if err != nil {
		return err
	}
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Destination
	// file.Filename has the real file name. We are not using that for now.
	dst, err := os.Create("videos/try.mp4")
	if err != nil {
		return err
	}
	defer dst.Close()

	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		return err
	}
	return nil
}
