<template>
  <div>
    <a v-b-toggle.sidebar-no-header>||||</a>
    <!-- <b-button @click='toggle = !toggle'>click me</b-button> -->
    <b-sidebar   id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
           <b>This is Alkatech Crm</b>
           <nav class="mb-3">
            <b-nav vertical>
              <b-button  @click="hide">Dashboard</b-button>
              <b-nav-item href="#link-1" @click="hide">All Client</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">close</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

