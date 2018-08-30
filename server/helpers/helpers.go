package helpers

import (
	"encoding/json"
	"net/http"
	"fmt"
)

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