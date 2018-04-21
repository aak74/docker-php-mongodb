package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

type site struct {
	ID string `json:"id"`
	// Domain string `json:"domain"`
	URL string `json:"url"`
	// Verifyssl bool   `json:"verifyssl"`
	// Timeout   int    `json:"timeout"`
}

func getUrls() (sites []site, err error) {
	resp, err := http.Get("http://127.0.0.1/api/v1/projects")
	// fmt.Println("resp:", err)
	if err == nil {

		jsonBlob, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}

		err = json.Unmarshal(jsonBlob, &sites)
		if err != nil {
			fmt.Println("error:", err)
		}
	}
	// fmt.Printf("%+v", sites)
	return
}

func main() {
	sites, err := getUrls()

	if err != nil {
		fmt.Println("Error", err)
		os.Exit(1)
	}
	start := time.Now()
	msg := make(chan string, 10)
	done := make(chan bool)
	// until := time.After(5 * time.Second)

	// var wg sync.WaitGroup
	// pinger := make(chan string)
	for i, url := range sites {
		// wg.Add(1)
		go request(msg, done, url.URL, i)
		// wg.Wait()
	}

	for i := range sites {
		res, _ := <-msg
		fmt.Println(fmt.Printf("%d/%d - %s", i+1, len(sites), res))
	}
	fmt.Printf("%.2fs elapsed\n", time.Since(start).Seconds())
	close(msg)

	// for i := range sites {
	// i := 0
	// for {
	// 	i++
	// 	fmt.Println(i)
	// 	select {
	// 	case m := <-msg:
	// 		fmt.Println(m)
	// 	case <-until:
	// 		done <- true
	// 		time.Sleep(500 * time.Millisecond)
	// 		fmt.Printf("%.2fs elapsed\n", time.Since(start).Seconds())
	// 		return
	// 	}
	// }
	// }

}

func request(ch chan<- string, done <-chan bool, url string, i int) {
	fmt.Println(i, url)
	// for {
	// 	select {
	// 	case <-done:
	// 		println("Done")
	// 		close(ch)
	// 		return
	// 	default:
	start := time.Now()
	resp, _ := http.Get(url)
	secs := time.Since(start).Seconds()
	if resp == nil {
		ch <- fmt.Sprintf("%d task fail after %.2fs: %s", i, secs, url)
	} else {
		defer resp.Body.Close()
		body, _ := ioutil.ReadAll(resp.Body)
		ch <- fmt.Sprintf("%d task %.2fs elapsed with response length: %d %s", i, secs, len(body), url)
	}
	// wg.Done()
	// 	}
	// }
}
