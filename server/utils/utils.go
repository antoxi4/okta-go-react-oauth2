package utils

import (
	"encoding/base64"
	"crypto/rand"
)

func RandToken(l int) string {
	b := make([]byte, l)
	rand.Read(b)

	return base64.StdEncoding.EncodeToString(b)
}