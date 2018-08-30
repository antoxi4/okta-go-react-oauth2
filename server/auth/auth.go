package auth

import (
	"golang.org/x/oauth2"
	"encoding/json"
	"io/ioutil"
	"os"
)

var conf *oauth2.Config
var userInfoURL = "https://dev-123366.oktapreview.com/oauth2/default/v1/userinfo"

type User struct {
  Name  string
  Locale string
  Email string
}

type TokenInfo struct {
	Active bool
}

type ConfigFile struct {
	ClientID string `json:"ClientID"`
	ClientSecret string `json:"ClientSecret"`
}

func init() {
	conf = getConfig()
}

func readConfigsFromFile() ConfigFile {
	var config ConfigFile

	jsonFile, err := os.Open("./secrets.json")

	if err != nil {
		return config
	}

	byteValue, _ := ioutil.ReadAll(jsonFile)
	
	json.Unmarshal(byteValue, &config)

	return config
}

func getConfig() *oauth2.Config {
	config := readConfigsFromFile()

	return &oauth2.Config {
    ClientID:     config.ClientID,
    ClientSecret: config.ClientSecret,
		RedirectURL:       "http://localhost:8081/authorization-code/callback",
		Scopes: []string{"offline_access", "openid", "profile", "email"},
    Endpoint: oauth2.Endpoint{
			AuthURL:  "https://dev-123366.oktapreview.com/oauth2/default/v1/authorize",
			TokenURL: "https://dev-123366.oktapreview.com/oauth2/default/v1/token",
		},
	}
}

func GetAuthToken(code string) (*oauth2.Token, error) {
	token, err := conf.Exchange(oauth2.NoContext, code)

	return token, err
}

func CollectToken(token string) *oauth2.Token {
	new_token := new(oauth2.Token)
	new_token.AccessToken = token

	return new_token
}

func GetAuthURL(state string) string {
	return conf.AuthCodeURL(state)
}

func GetUser(token *oauth2.Token) (User, error) {
	var jsosUser User

	client := conf.Client(oauth2.NoContext, token)
	user, err := client.Get("https://dev-123366.oktapreview.com/oauth2/default/v1/userinfo")

	if err == nil {
		buf := make([]byte, 1024)
		num, _ := user.Body.Read(buf)
		json.Unmarshal(buf[0:num], &jsosUser)
	}

	return jsosUser, err
}