# RAG Resume Retriever

A Retrieval-Augmented Generation (RAG) project developed during my internship at **FLR Spectrons Remote Software Solution Pvt. Ltd.** 

**This tool processes a folder of large number of PDF resumes (can be any type of file with any type of information as well), converts them into a vector database, and allows you to perform ANN semantic searches to find the best candidates (or best matching pdfs in general).**

## ✨ Features
* **Semantic Search:** Goes beyond exact keyword matches. For example, a query for *"Deep learning"* will successfully retrieve resumes mentioning related concepts like *"Machine learning"* or *"Neural networks"*.
* **Similarity Ranking:** Automatically ranks the retrieved PDFs in order of relevance, based on their similarity score to your query.
* **Automated Vectorization:** Seamlessly ingests a local folder of PDFs and builds the searchable vector database.
* * **Use case:** Instead of direct keyword search which only does exact matching which can take time, and won't return similar resources, RAG can effectively reduce the time while returning the relevant resources.
