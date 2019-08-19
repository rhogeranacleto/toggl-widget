import axios from 'axios';
const { ipcRenderer } = window.require('electron');

export async function me() {

  const { data } = await axios.get('/me');

  console.log(data);
}

export async function current() {

  const { data } = await axios.get('/time_entries/current');

  return data.data;
}

export async function project(id) {

  const { data } = await axios.get(`/projects/${id}`);

  return data.data;
}

export async function stop(id) {

  const { data } = await axios.get(`/time_entries/${id}/stop`);

  return data.data;
}

export async function get() {

  const { data } = await axios.get('/time_entries');

  return data;
}