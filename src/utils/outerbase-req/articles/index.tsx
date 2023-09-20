import axios from "axios";

export const findArticleIdBySlug = async (slug: string) => {
    const { data } = await axios.get(
      `https://minimum-aqua.cmd.outerbase.io/articles/id?slug=${slug}`
    );


    return data.response.items?.[0]?.id
}