package main

import (
	"./utils"
	"time"
	"./handlers"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/sessions"
)

func main() {
	r := gin.Default()
	store := sessions.NewCookieStore([]byte(utils.RandToken(64)))
	store.Options(sessions.Options{
		Path: "/",
		MaxAge: 86400 * 7,
	})

	r.Use(sessions.Sessions("goquestsession", store))
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:3000"
		},
		MaxAge: 12 * time.Hour,
	}))
	
	r.GET("/session", handlers.GetUser)
	r.GET("/login", handlers.GetAuthURL)
	r.GET("/logout", handlers.DeleteSession)
	r.GET("/authorization-code/callback", handlers.AuthCallback)

	r.Run("127.0.0.1:8081")
}