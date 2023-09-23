import axios from 'axios'



export const getProjectTotalPageNumber = async () => {
    const { data } = await axios.get('https://minimum-aqua.cmd.outerbase.io/project/page/total')
    return data.response.items?.[0].total_pages;
}

export const getAllProjects = async (pageOffset: number = 0) => {
  try {
    const { data } = await axios.get(`https://minimum-aqua.cmd.outerbase.io/projects/all?pageOffset=${pageOffset}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};