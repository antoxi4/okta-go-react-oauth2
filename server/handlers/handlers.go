package handlers

import (
	"../utils"
	"../auth"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/sessions"
)

func GetUser(c *gin.Context) {
	session := sessions.Default(c)
	tokenFromSession := session.Get("token")

	if tokenFromSession == nil {
		c.JSON(http.StatusUnauthorized, gin.H{ "message": "You must be logged in to the server (Unauthorized)" })

		return
	}
	
	token := auth.CollectToken(tokenFromSession.(string))

	user, err := auth.GetUser(token)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{ "message": err })

		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}

func GetAuthURL(c *gin.Context) {
	state := utils.RandToken(32)
	session := sessions.Default(c)
	authURL := auth.GetAuthURL(state)

	session.Set("state", state)
	session.Save()

	c.JSON(http.StatusOK, gin.H{"url": authURL})
}

func AuthCallback(c *gin.Context) {
	session := sessions.Default(c)
	retrievedState := session.Get("state")
	queryState := c.Request.URL.Query().Get("state")
	queryCode := c.Request.URL.Query().Get("code")

	if len(queryState) <= 0 || len(queryCode) <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": "INVALID_DATA",
			"message": "Invalid data for authentication",
		})

		return
	}

	if retrievedState != queryState {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": "INVALID_SESSION",
			"message": "Invalid session",
		})

		return
	}

	token, err := auth.GetAuthToken(queryCode)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": "TOKEN_ERROR",
			"message": "Failed token retrieving",
		})
	}

	user, errUsr := auth.GetUser(token)

	if errUsr != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": "TOKEN_ERROR",
			"message": "Failed token retrieving",
		})
	}

	session.Set("userid", user.Email)
	session.Set("token", token.AccessToken)
	session.Save()

	c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/signin")
	// c.JSON(http.StatusOK, gin.H{"token": token.AccessToken})
}

func DeleteSession(c *gin.Context) {
	session := sessions.Default(c)

	session.Clear()
	session.Save()

	c.JSON(http.StatusOK, gin.H{})
}