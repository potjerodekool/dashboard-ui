<template>
  <button class="btn btn-secondary forget-button" v-on:click="$router.push('/dashboard/config')">Config</button>
  <div class="App jumbotron d-flex">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card" style="width: 50rem;left: 20px;margin-bottom:5px;"
            v-for="item in state.items" :key="item.link">
            <div class="card-body">
              <h5 class="card-title">{{item.title}} </h5>
              {{formatDate(item.pubDate) }}
              <div style="padding-bottom: 2px;margin-bottom:10px;border-bottom:1px solid gray;">Categories: 
                <span v-for="(category, index) in item.categories" :key="category">
                  <span v-if="index > 0">, </span>
                  {{category}}
                </span>  
              </div>
              <span v-html="item.description"></span>
              <a v-bind:href="item.link">
                Lees verder
              </a>              
            </div>  
          </div>  
        </div> 
      </div>
      <div class="row"> 
        <div class="col-12">
        </div>            
      </div>  
    </div>
    
  </div>    
</template>

<script lang="ts">
import type { NewsItem } from 'src/api/model/NewsItem';
import {defineComponent, reactive} from 'vue';
import newsservice from '../api/newsservice';
import { DateTimeFormatter, LocalDateTime, ZonedDateTime } from '@js-joda/core'

interface State {
  items: NewsItem[],
  paginationState: {}
}

export default defineComponent({
  name: 'Dashboard',  
  components: {
  },
  mixins: [newsservice],
  
  mounted() {
    this.loadNews();
  },

  methods: {
    formatDate(date: any) {
      if (!date) {
        return "";
      } else {
          const dayOfMonth = this.padLeft(date.dayOfMonth, 2);
          const monthValue = this.padLeft(date.monthValue, 2);
          const hour = this.padLeft(date.hour, 2);
          const minute = this.padLeft(date.minute, 2);
          const second = this.padLeft(date.second, 2);

          return `${dayOfMonth}-${monthValue}-${date.year} ${hour}:${minute}:${second}`
      }
    },

    padLeft(s: string, length: number): string {
       if (s.length < length)  {
         return this.padLeft("0" + s, length)
       } else {
         return s
       }
    },

    loadNews() {
      newsservice.getNews().then(response => {
        const newsReponse = response.data
        this.state.items = newsReponse.records
      }).catch( error => {
        console.log("error: " + error);
      })
    }
  },
  
  setup() {
    const state = reactive({
      items: Array<NewsItem>()
    });
  
    return {
      state,
    };
  },
});
</script>

<style>
</style>
