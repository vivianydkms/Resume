import streamlit as st

from api import search_resumes


st.set_page_config(

    page_title="Relevant resource Selector",

    layout="wide"

)


st.title("Relevant resource Selector")

st.write("Find the best matching resources using semantic search (Vector embeddings).")


query = st.text_input(

    "Enter any topic about artificial intelligence (eg. neural networks, retrieval etc.) "

)


top_k = st.slider(

    "Number of Results",

    min_value=1,

    max_value=10,

    value=5

)


if st.button("Search"):

    if query.strip() == "":

        st.warning("Please enter a query.")

    else:

        results = search_resumes(

            query,

            top_k

        )

        st.subheader("Top Matching Resumes")

        for resume in results["results"]:

            st.markdown("---")

            st.write(

                f"**Filename:** {resume['filename']}"

            )

            st.write(

                f"**Similarity Score:** {resume['score']}"

            )

            st.link_button(

                "Open Resume",

                resume["download_url"]

            )