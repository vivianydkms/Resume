This a retrieval augmented generation project that I made during my internship at FLR spectrons Remote Software Solutionn Pvt. Ltd. It creates a vector database from the folder (called resumes here) which has pdfs. Every time a query is asked it retrieves the top most pdfs with the most relevance. 
For eg. It will also work for the query 'Deep learning' even if there's no explicit mention of the words 'Deep learning' by retrieving the pdfs with similar domains like 'Machine learning' or 'neural networks'.
It will also rank the pdfs in order of their similarity score ie. the query with pdf
