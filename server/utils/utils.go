package utils

import (
	"encoding/base64"
	"crypto/rand"
	"encoding/json"
	"net/http"
	"fmt"
)

func RandToken(l int) string {
	b := make([]byte, l)
	rand.Read(b)

	return base64.StdEncoding.EncodeToString(b)
}

func ToJSON(r *http.Response) interface {} {
	var a interface {}
	
	buf := make([]byte, 1024)
	num, _ := r.Body.Read(buf)
	err := json.Unmarshal(buf[0:num], &a)

	if err != nil {
		fmt.Println("error:", err)
	}
	
	return a
}