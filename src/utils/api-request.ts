import axios from 'axios'


export const SendContactForm = async (data: any) => {
  try {
    await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const AddViewCount = async (_id: string) => {
  try {
    const res = await fetch('/api/add-view-count', {
      method: 'POST',
      body: JSON.stringify({ _id }),
    });
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const AddComment = async (commentObj: any) => {
  try {
    const res = await fetch('/api/add-comment', {
      method: 'POST',
      body: JSON.stringify(commentObj),
    });

    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};



export const getMainContentHero = async () => {
  try {
    const { data } = await axios.get('https://light-gold.cmd.outerbase.io/main')
  return data
  } catch (error) {
    console.log(error)
    return error
  }
}
export const getAllSideProjects = async () => {
  try {
    const { data } = await axios.get('https://light-gold.cmd.outerbase.io/projects/side-project')
  return data
  } catch (error) {
    console.log(error)
    return error
  }
}
export const getAllProfessionalProjects = async () => {
  try {
    const { data } = await axios.get('https://light-gold.cmd.outerbase.io/projects/prefessional')
  return data
  } catch (error) {
    console.log(error)
    return error
  }
}
export const getAllProjects = async () => {
  try {
    const { data } = await axios.get('https://light-gold.cmd.outerbase.io/projects/all')
  return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const CommonPathProps = async ( table:string) => {
  try {
    const { data } = await axios.get(`https://light-gold.cmd.outerbase.io/data/slug?table=${table}`)
  return data
  } catch (error) {
    console.log(error)
    return error
  }

};


export const getDataBySlug = async (table:string, slug:string) => {
  try {
    const { data } = await axios.get(`https://light-gold.cmd.outerbase.io/table/slug?table=${table}&slug=${slug}`)
  return data
  } catch (error) {
    console.log(error)
    return error
  }

};
export const getAllArticles = async () => {
  try {
    const { data } = await axios.get(`https://light-gold.cmd.outerbase.io/artices`)
  return data
  } catch (error) {
    console.log(error)
    return error
  }

};