<template>
  <div>
    <b-form-group label="Using options array:"  >
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="selectedDays"
        :options="optionsDays"
        
        name="flavour-1"
      ></b-form-checkbox-group>
    </b-form-group>

    

    <div>Selected: <strong>{{ selectedDays }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedDays: [], // Must be an array reference!
        optionsDays: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' }
        ]
      }
    }
  }
</script>