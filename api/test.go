package handler

import (
	"fmt"
	"net/http"
	"ioutil"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["q"]

	w.Header().Add("Content-Type", "application/json")

	if !ok || len(keys[0]) < 1 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"status\": \"error\",\"message\":\"missing query param\"}")
		return
	}

	searchQuery := keys[0]

	resp, err := http.Get("https://www.googleapis.com/books/v1/volumes?q=" + searchQuery)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"status\": \"error\",\"message\":\"books api error\"}")
		return
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	fmt.Fprintf(w, body)
}