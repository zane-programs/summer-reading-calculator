package handler

import (
	"fmt"
	"net/http"
	"io/ioutil"
	"strings"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["q"]

	w.Header().Add("Content-Type", "application/json; charset=UTF-8")

	if !ok || len(keys[0]) < 1 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"status\":\"error\",\"message\":\"missing query param\"}")
		return
	}

	searchQuery := strings.Replace(strings.Trim(keys[0]), " ", "+", -1)

	resp, err := http.Get("https://www.googleapis.com/books/v1/volumes?q=" + searchQuery)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"status\": \"error\",\"message\":\"books api error\"}")
		return
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	bodyString := string(body)

	fmt.Fprintf(w, bodyString)
}