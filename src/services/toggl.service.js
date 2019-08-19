import axios from 'axios';
import moment from 'moment';

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

  return data.reverse();
}

export async function start(entry) {

  const { data } = await axios.post('/time_entries/start', {
    time_entry: {
      description: entry.description,
      tags: entry.tags,
      pid: entry.pid,
      created_with: 'widget'
    }
  });

  return data.data;
}