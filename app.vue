<script setup lang="ts">
import type { ListUser } from './types/user';

const { logout, currentProvider, login, user, refresh, loggedIn } = useOidcAuth();
const listAnime = ref<ListUser>();
const refreshing = ref(false)
const fetchAnime = async () => {
  try {
    const data: ListUser = await $fetch('https://api.diyproject.live/json/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user.value?.accessToken}`,
      },
    });
    listAnime.value = data;
  } catch (error: any) {
    console.error(error);
  }
};

async function handleRefresh() {
  refreshing.value = true
  await refresh()
  refreshing.value = false
}

</script>

<template>
  <div class="w-screen pt-10">
    <div class="flex justify-center items-center gap-4">
      <UButton @click="login('keycloak')">Login</UButton>
      <UButton @click="fetchAnime()">Call Service</UButton>
      <UButton @click="logout('keycloak')">Logout</UButton>
      <UButton :disabled="!loggedIn || !user?.canRefresh || refreshing" @click="handleRefresh()">
        Refresh
      </UButton>
      <p>Current Provider = {{ currentProvider }}</p>
    </div>
    <pre>{{ user }}</pre>
    <ClientOnly>
      <div v-if="listAnime?.users && listAnime.users.length > 0">
        <div v-for="anime in listAnime.users" :key="anime.id">
          <p>{{ anime.id }}</p>
          <p>{{ anime.firstName }}</p>
          <p>{{ anime.email }}</p>
        </div>
      </div>
    </ClientOnly>
  </div>

</template>
