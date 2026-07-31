export type RichTextSegment = {
  text: string;
  strong?: boolean;
  emphasis?: boolean;
};

export type RagCaseStudyBlock =
  | {
      type: "paragraph";
      content: RichTextSegment[];
      sourceIndexes: number[];
    }
  | {
      type: "heading";
      level: 2 | 3 | 4;
      text: string;
      sourceIndexes: number[];
    }
  | {
      type: "list";
      ordered: boolean;
      items: RichTextSegment[][];
      sourceIndexes: number[];
    }
  | {
      type: "quote";
      content: RichTextSegment[];
      sourceIndexes: number[];
    }
  | {
      type: "code";
      text: string;
      sourceIndexes: number[];
    }
  | {
      type: "sequence";
      items: string[];
      sourceIndexes: number[];
    }
  | {
      type: "figure";
      number: number;
      variant: "standard" | "paired" | "portrait" | "wide";
      images: {
        src: string;
        alt: string;
        width: number;
        height: number;
      }[];
      caption: string;
      sourceIndexes: number[];
    };

export type RagCaseStudyOutlineEntry = {
  id: string;
  label: string;
  level: 1 | 2 | 3;
  ancestorIds: string[];
};

export type RagTechnologyStackItem = {
  category: string;
  technologies: string;
  icon: "application" | "ai" | "storage" | "document";
};

export function createRagCaseStudyHeadingId(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const ragCaseStudyTitle =
  "Building a Conversational RAG Knowledge Assistant";

export const ragTechnologyStack = [
  {
    category: "Application",
    technologies: "Python, Streamlit",
    icon: "application",
  },
  {
    category: "AI Models",
    technologies: "OpenAI GPT-4.1 mini, text-embedding-3-large",
    icon: "ai",
  },
  {
    category: "Retrieval & Storage",
    technologies: "ChromaDB, LangChain SemanticChunker",
    icon: "storage",
  },
  {
    category: "Document Processing & Observability",
    technologies: "pypdf, PyMuPDF, Pillow, tiktoken, API usage metadata",
    icon: "document",
  },
] as const satisfies readonly RagTechnologyStackItem[];

export const ragCaseStudySourceStats = {
  paragraphCount: 388,
  nonEmptyParagraphCount: 361,
  imageCount: 11,
  figureCount: 10,
} as const;

export const ragCaseStudyBlocks: RagCaseStudyBlock[] = [
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Organizations do not usually suffer from a lack of information. They suffer from information being difficult to find, scattered across long documents, and disconnected from the moment when someone actually needs it."
      }
    ],
    "sourceIndexes": [
      1
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The RAG Knowledge Assistant is a conversational document intelligence application designed to address that problem. It allows users to upload PDF documents, transform them into a searchable knowledge base, and ask questions in natural language. Instead of returning a list of documents or relying on an AI model’s general knowledge, the application retrieves the most relevant passages from the uploaded files and uses those passages to generate a source-grounded answer."
      }
    ],
    "sourceIndexes": [
      2
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "At a high level, the application does three things:"
      }
    ],
    "sourceIndexes": [
      3
    ]
  },
  {
    "type": "list",
    "ordered": true,
    "items": [
      [
        {
          "text": "It converts static PDF documents into a searchable knowledge system."
        }
      ],
      [
        {
          "text": "It uses a multi-stage Retrieval-Augmented Generation pipeline to answer questions accurately."
        }
      ],
      [
        {
          "text": "It reduces the effort required to locate, interpret, and verify information across document-heavy knowledge bases."
        }
      ]
    ],
    "sourceIndexes": [
      4,
      5,
      6
    ]
  },
  {
    "type": "figure",
    "number": 1,
    "variant": "standard",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-01-grounded-response-interface.png",
        "alt": "RAG Knowledge Assistant chat interface showing a grounded response, answer evidence, and source cards",
        "width": 1943,
        "height": 932
      }
    ],
    "caption": "Figure 1. RAG Knowledge Assistant interface showing a document-grounded response and the supporting evidence used to generate it.",
    "sourceIndexes": [
      7,
      8
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "1. What Does the RAG Knowledge Assistant Do?",
    "sourceIndexes": [
      10
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It turns a collection of PDFs into a conversational knowledge base",
    "sourceIndexes": [
      11
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The RAG Knowledge Assistant allows a user to upload one or more PDF files and then interact with their contents through a chat interface."
      }
    ],
    "sourceIndexes": [
      12
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Instead of manually opening each PDF, searching for keywords, reading multiple pages, and combining information from different sections, the user can ask a direct question such as:"
      }
    ],
    "sourceIndexes": [
      13
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“What is the company’s parental leave policy?”"
      }
    ],
    "sourceIndexes": [
      14
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“How many vacation days are available to a new employee?”"
      }
    ],
    "sourceIndexes": [
      15
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“What steps are required before submitting an expense reimbursement?”"
      }
    ],
    "sourceIndexes": [
      16
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“What does the onboarding document say about access requests?”"
      }
    ],
    "sourceIndexes": [
      17
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The system searches the indexed documents, identifies the passages most relevant to the question, and generates an answer based only on those passages."
      }
    ],
    "sourceIndexes": [
      18
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application supports multiple PDF uploads, automatically saves the files, ingests them into the knowledge base, and displays the progress of the ingestion process. The current implementation accepts up to five PDFs in a single upload batch and processes each file through extraction, chunking, embedding, and vector-database storage."
      }
    ],
    "sourceIndexes": [
      19
    ]
  },
  {
    "type": "figure",
    "number": 2,
    "variant": "standard",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-02-document-ingestion-workspace.png",
        "alt": "Document ingestion workspace with PDF upload, ingestion progress, document metrics, library, and PDF preview",
        "width": 1150,
        "height": 877
      }
    ],
    "caption": "Figure 2 Document ingestion workspace showing PDF upload, pipeline progress, indexed-document metrics, and the searchable document library.",
    "sourceIndexes": [
      22,
      23
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It produces answers grounded in uploaded documents",
    "sourceIndexes": [
      25
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "A major characteristic of the application is that it is not intended to behave like a general-purpose chatbot."
      }
    ],
    "sourceIndexes": [
      26
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "A normal large language model may answer using patterns learned during training, even when the answer is not present in the user’s documents. The RAG Knowledge Assistant instead instructs the language model to answer only from retrieved document context."
      }
    ],
    "sourceIndexes": [
      27
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The answer-generation prompt contains explicit rules requiring the model to:"
      }
    ],
    "sourceIndexes": [
      28
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "use only the retrieved document passages;"
        }
      ],
      [
        {
          "text": "avoid outside knowledge;"
        }
      ],
      [
        {
          "text": "state that it does not know when the answer is not present;"
        }
      ],
      [
        {
          "text": "attach an inline citation to factual claims;"
        }
      ],
      [
        {
          "text": "identify incomplete or conflicting source information."
        }
      ]
    ],
    "sourceIndexes": [
      29,
      30,
      31,
      32,
      33
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application uses a standard fallback response when sufficient evidence is unavailable:"
      }
    ],
    "sourceIndexes": [
      34
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“I don’t know based on the uploaded documents.”"
      }
    ],
    "sourceIndexes": [
      35
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This makes the system more trustworthy than a chatbot that always attempts to produce an answer, even when it lacks supporting evidence."
      }
    ],
    "sourceIndexes": [
      36
    ]
  },
  {
    "type": "figure",
    "number": 3,
    "variant": "standard",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-03-source-grounded-response.png",
        "alt": "RAG Knowledge Assistant response with inline source citation and supporting evidence cards",
        "width": 1620,
        "height": 883
      }
    ],
    "caption": "Figure 3 Figure 3. A source-grounded response generated only from retrieved document context, with inline citations identifying the supporting PDF, page, and chunk.",
    "sourceIndexes": [
      38,
      39
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It provides traceable source citations",
    "sourceIndexes": [
      40
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Every indexed passage contains metadata identifying where it came from. This includes:"
      }
    ],
    "sourceIndexes": [
      41
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "the PDF filename;"
        }
      ],
      [
        {
          "text": "the primary page;"
        }
      ],
      [
        {
          "text": "the range of pages represented by the chunk;"
        }
      ],
      [
        {
          "text": "a unique chunk identifier;"
        }
      ],
      [
        {
          "text": "the document’s SHA-256 hash;"
        }
      ],
      [
        {
          "text": "the chunking strategy;"
        }
      ],
      [
        {
          "text": "the embedding model;"
        }
      ],
      [
        {
          "text": "the ingestion timestamp."
        }
      ]
    ],
    "sourceIndexes": [
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "When the system generates an answer, it is instructed to cite the relevant source using a format such as:"
      }
    ],
    "sourceIndexes": [
      50
    ]
  },
  {
    "type": "code",
    "text": "[source: employee-handbook.pdf, page 14, chunk a81f29c0-0007]",
    "sourceIndexes": [
      51
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "For a chunk that contains information spanning adjacent pages, the citation can represent a page range:"
      }
    ],
    "sourceIndexes": [
      52
    ]
  },
  {
    "type": "code",
    "text": "[source: benefits-guide.pdf, pages 10-11, chunk f7c298ab-0012]",
    "sourceIndexes": [
      53
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This allows the user to understand not only what the answer is, but also where that answer came from. The metadata stored with each vector makes it possible to trace a generated statement back to a specific document, page, and indexed passage."
      }
    ],
    "sourceIndexes": [
      54
    ]
  },
  {
    "type": "figure",
    "number": 4,
    "variant": "paired",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-04a-evidence-passage-modal.png",
        "alt": "Evidence modal showing a retrieved passage with source metadata, similarity score, and rerank score",
        "width": 4719,
        "height": 2567
      },
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-04b-original-pdf-page-preview.png",
        "alt": "Original PDF preview showing the page from which the retrieved evidence was derived",
        "width": 1786,
        "height": 873
      }
    ],
    "caption": "Figure 4 Evidence verification flow: the retrieved source passage and scoring information are shown alongside the original PDF page from which the answer was derived.",
    "sourceIndexes": [
      55,
      57,
      58
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It supports follow-up questions",
    "sourceIndexes": [
      59
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application is conversational rather than limited to isolated searches."
      }
    ],
    "sourceIndexes": [
      60
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "For example, a user might first ask:"
      }
    ],
    "sourceIndexes": [
      61
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“"
      },
      {
        "text": "What are Ozempic and "
      },
      {
        "text": "Wegovy ?"
      },
      {
        "text": "”"
      }
    ],
    "sourceIndexes": [
      62
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "They could then follow up with:"
      }
    ],
    "sourceIndexes": [
      63
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“"
      },
      {
        "text": "What were the US list prices of these two drugs?"
      },
      {
        "text": "”"
      }
    ],
    "sourceIndexes": [
      64
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The second question is incomplete when viewed by itself because the word “"
      },
      {
        "text": "these"
      },
      {
        "text": "” refers to "
      },
      {
        "text": "Ozempic and Wegovy"
      },
      {
        "text": " from the previous question. The application uses recent conversation history to rewrite the follow-up into a standalone search query before retrieval."
      }
    ],
    "sourceIndexes": [
      65
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Conceptually, the rewritten query might become:"
      }
    ],
    "sourceIndexes": [
      66
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“"
      },
      {
        "text": "What are the US list prices of Ozempic and Wegovy?"
      },
      {
        "text": "”"
      }
    ],
    "sourceIndexes": [
      67
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This improves retrieval because the vector database receives a complete and contextually meaningful question rather than an ambiguous follow-up. The implementation uses up to six recent conversational turns when preparing this context."
      }
    ],
    "sourceIndexes": [
      68
    ]
  },
  {
    "type": "figure",
    "number": 5,
    "variant": "standard",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-05-conversational-query-handling.png",
        "alt": "Conversation showing a follow-up question rewritten into a standalone query with answer evidence",
        "width": 1780,
        "height": 868
      }
    ],
    "caption": "Figure 5 Conversational query handling: the application uses previous chat context to transform an ambiguous follow-up into a standalone retrieval query.",
    "sourceIndexes": [
      70,
      71
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It offers document-management capabilities",
    "sourceIndexes": [
      72
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application includes a document library rather than treating ingestion as an invisible backend operation."
      }
    ],
    "sourceIndexes": [
      73
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Users can:"
      }
    ],
    "sourceIndexes": [
      74
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "upload and index PDF documents;"
        }
      ],
      [
        {
          "text": "view the number of indexed documents and chunks;"
        }
      ],
      [
        {
          "text": "inspect ingestion status;"
        }
      ],
      [
        {
          "text": "search the document library;"
        }
      ],
      [
        {
          "text": "preview uploaded PDFs;"
        }
      ],
      [
        {
          "text": "inspect document metadata;"
        }
      ],
      [
        {
          "text": "delete a document;"
        }
      ],
      [
        {
          "text": "remove the corresponding vectors from ChromaDB;"
        }
      ],
      [
        {
          "text": "re-ingest documents when required."
        }
      ]
    ],
    "sourceIndexes": [
      75,
      76,
      77,
      78,
      79,
      80,
      81,
      82,
      83
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Duplicate documents are detected through SHA-256 hashing. When an identical PDF has already been indexed, the application skips it rather than creating a second copy of the same chunks and embeddings."
      }
    ],
    "sourceIndexes": [
      84
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It exposes what happens behind the answer",
    "sourceIndexes": [
      85
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Many AI applications show only the final output. This application also exposes the processing that produced the answer."
      }
    ],
    "sourceIndexes": [
      86
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "For each response, it stores:"
      }
    ],
    "sourceIndexes": [
      87
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "the user’s original question;"
        }
      ],
      [
        {
          "text": "the rewritten standalone query;"
        }
      ],
      [
        {
          "text": "the initially retrieved chunks;"
        }
      ],
      [
        {
          "text": "the reranked chunks;"
        }
      ],
      [
        {
          "text": "the model used;"
        }
      ],
      [
        {
          "text": "response time;"
        }
      ],
      [
        {
          "text": "token usage for each stage;"
        }
      ],
      [
        {
          "text": "the sources used in the final answer."
        }
      ]
    ],
    "sourceIndexes": [
      88,
      89,
      90,
      91,
      92,
      93,
      94,
      95
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The interface provides both a "
      },
      {
        "text": "Sources used",
        "strong": true
      },
      {
        "text": " view and a "
      },
      {
        "text": "Behind the scenes",
        "strong": true
      },
      {
        "text": " view. This makes the application useful not only as a document assistant, but also as a portfolio demonstration of how a RAG pipeline operates internally."
      }
    ],
    "sourceIndexes": [
      96
    ]
  },
  {
    "type": "figure",
    "number": 6,
    "variant": "portrait",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-06-observability-panel.png",
        "alt": "Behind-the-scenes observability panel with rewritten query, model, response time, token usage, and sources",
        "width": 435,
        "height": 811
      }
    ],
    "caption": "Figure 6 Behind-the-scenes observability showing query transformation, retrieval results, reranking data, model execution, response time, and token consumption.",
    "sourceIndexes": [
      97,
      98
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "2. How Does the RAG Knowledge Assistant Work?",
    "sourceIndexes": [
      100
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application uses Retrieval-Augmented Generation, commonly called RAG."
      }
    ],
    "sourceIndexes": [
      101
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "RAG combines two capabilities:"
      }
    ],
    "sourceIndexes": [
      102
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Retrieval",
        "strong": true
      },
      {
        "text": " finds information relevant to the user’s question."
      }
    ],
    "sourceIndexes": [
      103
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Generation",
        "strong": true
      },
      {
        "text": " uses a language model to turn that retrieved information into a readable answer."
      }
    ],
    "sourceIndexes": [
      104
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The system therefore does not send every uploaded document to the language model for every question. Instead, it builds a searchable index in advance, retrieves a small set of relevant passages, and sends only those passages to the model."
      }
    ],
    "sourceIndexes": [
      105
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The architecture can be understood as two major pipelines:"
      }
    ],
    "sourceIndexes": [
      106
    ]
  },
  {
    "type": "list",
    "ordered": true,
    "items": [
      [
        {
          "text": "the document-ingestion pipeline;"
        }
      ],
      [
        {
          "text": "the question-answering pipeline."
        }
      ]
    ],
    "sourceIndexes": [
      107,
      108
    ]
  },
  {
    "type": "figure",
    "number": 7,
    "variant": "wide",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-07-overall-rag-system-architecture.png",
        "alt": "Overall RAG system architecture connecting document ingestion, persistent ChromaDB, and conversational question answering",
        "width": 1429,
        "height": 1071
      }
    ],
    "caption": "Figure 7. End-to-end architecture of the RAG Knowledge Assistant, showing how documents are indexed and later retrieved to produce source-grounded answers.",
    "sourceIndexes": [
      109,
      110
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Pipeline A: Document ingestion",
    "sourceIndexes": [
      112
    ]
  },
  {
    "type": "figure",
    "number": 8,
    "variant": "wide",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-08-document-ingestion-pipeline.png",
        "alt": "Document ingestion pipeline from PDF upload through duplicate detection, extraction, semantic chunking, embeddings, metadata, and ChromaDB",
        "width": 1448,
        "height": 1086
      }
    ],
    "caption": "Figure 8. Document ingestion pipeline, from PDF upload and SHA-256 duplicate detection to semantic chunking, embedding generation, metadata attachment, and persistent ChromaDB storage.",
    "sourceIndexes": [
      113,
      114
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Step 1: The user uploads PDF documents",
    "sourceIndexes": [
      115
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The Streamlit interface accepts multiple PDF files. The application validates the file type, sanitizes filenames, prevents accidental overwriting by generating unique filenames when necessary, and saves the documents to the active upload directory."
      }
    ],
    "sourceIndexes": [
      116
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The storage location depends on where the application is running."
      }
    ],
    "sourceIndexes": [
      117
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "During local development, uploaded files and the ChromaDB index are stored in normal persistent project directories."
      }
    ],
    "sourceIndexes": [
      118
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "On Streamlit Community Cloud, the application uses session-specific directories so that different visitors do not share the same uploaded documents or vector database. Each session receives its own folder under:"
      }
    ],
    "sourceIndexes": [
      119
    ]
  },
  {
    "type": "code",
    "text": "runtime_sessions/<session_id>/",
    "sourceIndexes": [
      120
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The browser stores an anonymous session identifier for up to seven days. This allows the same browser to reconnect to its previous temporary session when the Streamlit runtime still contains the files. The repository explicitly identifies this as demo persistence rather than production-grade persistence."
      }
    ],
    "sourceIndexes": [
      121
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Step 2: Text is extracted page by page",
    "sourceIndexes": [
      122
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application uses "
      },
      {
        "text": "pypdf"
      },
      {
        "text": " to open each document and extract text from individual pages."
      }
    ],
    "sourceIndexes": [
      123
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Page-level extraction is important because the system needs to preserve source location information. If the entire PDF were extracted as one unstructured block, it would be difficult to provide accurate page citations later."
      }
    ],
    "sourceIndexes": [
      124
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "For every page containing extractable text, the system stores:"
      }
    ],
    "sourceIndexes": [
      125
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "the source filename;"
        }
      ],
      [
        {
          "text": "the page number;"
        }
      ],
      [
        {
          "text": "the cleaned page text."
        }
      ]
    ],
    "sourceIndexes": [
      126,
      127,
      128
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Pages without extractable text are skipped. This also means that scanned, image-only PDFs currently require OCR before they can be understood by the system."
      }
    ],
    "sourceIndexes": [
      129
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Step 3: Adjacent-page context is added",
    "sourceIndexes": [
      130
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Document meaning does not always respect page boundaries."
      }
    ],
    "sourceIndexes": [
      131
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "A sentence may begin on one page and continue on the next. A policy heading may appear at the bottom of one page while its explanation appears on the following page. Splitting strictly at page boundaries can therefore remove important context."
      }
    ],
    "sourceIndexes": [
      132
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "To reduce this problem, the application creates a context window containing:"
      }
    ],
    "sourceIndexes": [
      133
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "the end of the previous page;"
        }
      ],
      [
        {
          "text": "the complete current page;"
        }
      ],
      [
        {
          "text": "the beginning of the next page."
        }
      ]
    ],
    "sourceIndexes": [
      134,
      135,
      136
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The system retains up to 4,000 characters of adjacent-page context on either side. It labels each section as previous-page, current-page, or next-page context and records the resulting page range."
      }
    ],
    "sourceIndexes": [
      137
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This is a meaningful improvement over basic PDF-chat implementations that split each page independently."
      }
    ],
    "sourceIndexes": [
      138
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Step 4: The document is divided using semantic chunking",
    "sourceIndexes": [
      139
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Large language models and vector databases do not work most effectively when an entire document is represented as one enormous block. The text must be divided into smaller units called "
      },
      {
        "text": "chunks",
        "strong": true
      },
      {
        "text": "."
      }
    ],
    "sourceIndexes": [
      140
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "A basic splitter divides text after a fixed number of characters or tokens. Although simple, that approach can separate a heading from its explanation, divide a policy halfway through a sentence, or mix unrelated subjects in one chunk."
      }
    ],
    "sourceIndexes": [
      141
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application instead uses LangChain’s "
      },
      {
        "text": "SemanticChunker"
      },
      {
        "text": "."
      }
    ],
    "sourceIndexes": [
      142
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Semantic chunking examines the semantic relationship between nearby sentences using embeddings. It creates a new chunk when the meaning changes substantially. In practical terms, this attempts to keep logically related material—such as a definition, procedure, policy, or explanation—within the same passage."
      }
    ],
    "sourceIndexes": [
      143
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The implementation uses:"
      }
    ],
    "sourceIndexes": [
      144
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "SemanticChunker"
        },
        {
          "text": ";"
        }
      ],
      [
        {
          "text": "OpenAI embeddings;"
        }
      ],
      [
        {
          "text": "percentile-based breakpoint detection;"
        }
      ],
      [
        {
          "text": "a breakpoint threshold of 75."
        }
      ]
    ],
    "sourceIndexes": [
      145,
      146,
      147,
      148
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "It also verifies that each generated chunk genuinely contains information from the current page rather than only containing copied adjacent-page context."
      }
    ],
    "sourceIndexes": [
      149
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Step 5: A fallback splitter protects the ingestion process",
    "sourceIndexes": [
      150
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "External model calls or semantic splitting can sometimes fail."
      }
    ],
    "sourceIndexes": [
      151
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Instead of causing the entire ingestion operation to stop, the application falls back to a recursive character splitter. The fallback uses:"
      }
    ],
    "sourceIndexes": [
      152
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "a target chunk size of 1,400 characters;"
        }
      ],
      [
        {
          "text": "a 180-character overlap;"
        }
      ],
      [
        {
          "text": "paragraph, newline, sentence, space, and character separators."
        }
      ]
    ],
    "sourceIndexes": [
      153,
      154,
      155
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This is an example of fault-tolerant pipeline design. Semantic chunking is preferred, but the application still creates usable chunks when the semantic process is unavailable."
      }
    ],
    "sourceIndexes": [
      156
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Step 6: Each chunk is converted into an embedding",
    "sourceIndexes": [
      157
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "An embedding is a numerical representation of meaning."
      }
    ],
    "sourceIndexes": [
      158
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The system sends each chunk to OpenAI’s "
      },
      {
        "text": "text-embedding-3-large"
      },
      {
        "text": " model. The model converts the text into a high-dimensional vector—a list of numbers representing its semantic characteristics."
      }
    ],
    "sourceIndexes": [
      159
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Chunks discussing similar subjects produce vectors that are relatively close to one another, even when they do not contain identical keywords."
      }
    ],
    "sourceIndexes": [
      160
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "For example, a document may use the phrase:"
      }
    ],
    "sourceIndexes": [
      161
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“annual paid leave allowance”"
      }
    ],
    "sourceIndexes": [
      162
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "while the user asks:"
      }
    ],
    "sourceIndexes": [
      163
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“How many vacation days do employees receive?”"
      }
    ],
    "sourceIndexes": [
      164
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Traditional keyword search may struggle because “vacation days” and “annual paid leave allowance” are different phrases. Embedding-based retrieval can recognize that they express a similar concept."
      }
    ],
    "sourceIndexes": [
      165
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The project uses "
      },
      {
        "text": "text-embedding-3-large"
      },
      {
        "text": " for both stored document chunks and incoming user queries."
      }
    ],
    "sourceIndexes": [
      166
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Step 7: Chunks and metadata are stored in ChromaDB",
    "sourceIndexes": [
      167
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application uses a persistent ChromaDB collection called "
      },
      {
        "text": "rag_docs"
      },
      {
        "text": "."
      }
    ],
    "sourceIndexes": [
      168
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "ChromaDB stores:"
      }
    ],
    "sourceIndexes": [
      169
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "the chunk text;"
        }
      ],
      [
        {
          "text": "the embedding vector;"
        }
      ],
      [
        {
          "text": "a unique chunk ID;"
        }
      ],
      [
        {
          "text": "document and page metadata."
        }
      ]
    ],
    "sourceIndexes": [
      170,
      171,
      172,
      173
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The collection uses cosine distance, which measures how similar two embedding vectors are in direction. During retrieval, lower cosine distance indicates greater semantic similarity."
      }
    ],
    "sourceIndexes": [
      174
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The use of persistent storage means documents do not need to be reprocessed every time the locally hosted application restarts."
      }
    ],
    "sourceIndexes": [
      175
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Step 8: SHA-256 hashing prevents duplicates",
    "sourceIndexes": [
      176
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Before a document is ingested, the application computes a SHA-256 hash from its file contents."
      }
    ],
    "sourceIndexes": [
      177
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "A hash functions like a digital fingerprint. Two files with exactly the same contents produce the same hash."
      }
    ],
    "sourceIndexes": [
      178
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application checks whether that hash already exists in ChromaDB. When it does, the duplicate is skipped unless forced re-ingestion has been requested."
      }
    ],
    "sourceIndexes": [
      179
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This prevents:"
      }
    ],
    "sourceIndexes": [
      180
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "duplicate vectors;"
        }
      ],
      [
        {
          "text": "repeated search results;"
        }
      ],
      [
        {
          "text": "unnecessary embedding costs;"
        }
      ],
      [
        {
          "text": "inflated document counts;"
        }
      ],
      [
        {
          "text": "wasted storage."
        }
      ]
    ],
    "sourceIndexes": [
      181,
      182,
      183,
      184,
      185
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Pipeline B: Question answering",
    "sourceIndexes": [
      188
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Once documents have been ingested, the application executes a four-stage question-answering pipeline."
      }
    ],
    "sourceIndexes": [
      189
    ]
  },
  {
    "type": "figure",
    "number": 9,
    "variant": "wide",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-09-question-answering-pipeline.png",
        "alt": "Question-answering pipeline from user question and query rewriting through retrieval, reranking, grounded generation, and citations",
        "width": 1431,
        "height": 787
      }
    ],
    "caption": "Figure 9. Question-answering pipeline, showing how conversational context, query rewriting, vector retrieval, LLM reranking, and grounded generation produce a source-cited answer.",
    "sourceIndexes": [
      190,
      191
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Stage 1: Rewrite the question",
    "sourceIndexes": [
      192
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application first examines recent chat history."
      }
    ],
    "sourceIndexes": [
      193
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "When the latest question depends on something mentioned earlier, "
      },
      {
        "text": "gpt-4.1-mini"
      },
      {
        "text": " rewrites it as a standalone retrieval query. The model is instructed to use the conversation only to resolve pronouns or missing context and to return the question unchanged when it is already self-contained."
      }
    ],
    "sourceIndexes": [
      194
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The rewriting call uses a temperature of zero to make the output more deterministic."
      }
    ],
    "sourceIndexes": [
      195
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This stage improves retrieval for questions such as:"
      }
    ],
    "sourceIndexes": [
      196
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“What about part-time employees?”"
      }
    ],
    "sourceIndexes": [
      197
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "because the system can transform it into something closer to:"
      }
    ],
    "sourceIndexes": [
      198
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“How does the parental leave policy apply to part-time employees?”"
      }
    ],
    "sourceIndexes": [
      199
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Stage 2: Retrieve the ten most similar chunks",
    "sourceIndexes": [
      200
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The rewritten question is converted into an embedding using the same "
      },
      {
        "text": "text-embedding-3-large"
      },
      {
        "text": " model used for the document chunks."
      }
    ],
    "sourceIndexes": [
      201
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "ChromaDB then compares the question vector with the stored document vectors and retrieves the ten nearest chunks."
      }
    ],
    "sourceIndexes": [
      202
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "For every retrieved result, the application records:"
      }
    ],
    "sourceIndexes": [
      203
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "its initial retrieval rank;"
        }
      ],
      [
        {
          "text": "the source document;"
        }
      ],
      [
        {
          "text": "page information;"
        }
      ],
      [
        {
          "text": "chunk ID;"
        }
      ],
      [
        {
          "text": "document hash;"
        }
      ],
      [
        {
          "text": "cosine distance;"
        }
      ],
      [
        {
          "text": "calculated similarity score;"
        }
      ],
      [
        {
          "text": "complete metadata."
        }
      ]
    ],
    "sourceIndexes": [
      204,
      205,
      206,
      207,
      208,
      209,
      210,
      211
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application converts distance into a human-readable similarity value using:"
      }
    ],
    "sourceIndexes": [
      212
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "similarity = 1 - distance"
      }
    ],
    "sourceIndexes": [
      213
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "with a lower bound of zero."
      }
    ],
    "sourceIndexes": [
      214
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Stage 3: Rerank the retrieved chunks",
    "sourceIndexes": [
      215
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Vector similarity is effective, but it is not always sufficient."
      }
    ],
    "sourceIndexes": [
      216
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "A passage can be semantically similar to the question without directly answering it. For example, several chunks may discuss employee benefits, but only one contains the exact eligibility condition requested by the user."
      }
    ],
    "sourceIndexes": [
      217
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application therefore adds a second retrieval stage: LLM-based reranking."
      }
    ],
    "sourceIndexes": [
      218
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "gpt-4.1-mini"
      },
      {
        "text": " receives the user’s rewritten query and the ten retrieved chunks. It assigns each chunk:"
      }
    ],
    "sourceIndexes": [
      219
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "a relevance score between zero and one;"
        }
      ],
      [
        {
          "text": "a brief explanation for the score."
        }
      ]
    ],
    "sourceIndexes": [
      220,
      221
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The chunks are then sorted by the reranking score, and only the five strongest passages are retained for answer generation."
      }
    ],
    "sourceIndexes": [
      222
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "When reranking fails, the application falls back to the original vector-similarity score instead of terminating the request."
      }
    ],
    "sourceIndexes": [
      223
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This creates a two-stage retrieval architecture:"
      }
    ],
    "sourceIndexes": [
      224
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Broad semantic retrieval:",
        "strong": true
      },
      {
        "text": " Find ten potentially relevant passages quickly."
      }
    ],
    "sourceIndexes": [
      225
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Precise reranking:",
        "strong": true
      },
      {
        "text": " Select the five passages most likely to answer the question."
      }
    ],
    "sourceIndexes": [
      226
    ]
  },
  {
    "type": "figure",
    "number": 10,
    "variant": "wide",
    "images": [
      {
        "src": "/images/projects/rag-knowledge-assistant/figure-10-two-stage-retrieval-reranking.png",
        "alt": "Two-stage retrieval and reranking architecture showing top-ten vector retrieval and top-five LLM-ranked context selection",
        "width": 1431,
        "height": 787
      }
    ],
    "caption": "Figure 10. Two-stage retrieval architecture: ChromaDB first retrieves the ten most semantically similar chunks, after which an LLM reranker selects the five passages most relevant to the user’s question.",
    "sourceIndexes": [
      227,
      228
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Stage 4: Generate the grounded answer",
    "sourceIndexes": [
      229
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The five highest-ranked chunks are formatted into structured context blocks."
      }
    ],
    "sourceIndexes": [
      230
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Each context block contains:"
      }
    ],
    "sourceIndexes": [
      231
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "the source filename;"
        }
      ],
      [
        {
          "text": "the page or page range;"
        }
      ],
      [
        {
          "text": "the chunk ID;"
        }
      ],
      [
        {
          "text": "the retrieved text."
        }
      ]
    ],
    "sourceIndexes": [
      232,
      233,
      234,
      235
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The language model receives the standalone question and these context blocks. It is then instructed to answer using only this information and to include inline citations."
      }
    ],
    "sourceIndexes": [
      236
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The final answer uses "
      },
      {
        "text": "gpt-4.1-mini"
      },
      {
        "text": " with a temperature of 0.2. The low temperature reduces unnecessary creativity while still allowing the model to organize retrieved facts into a readable response."
      }
    ],
    "sourceIndexes": [
      237
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The complete runtime sequence is therefore:"
      }
    ],
    "sourceIndexes": [
      238
    ]
  },
  {
    "type": "sequence",
    "items": [
      "User question",
      "→ Conversational query rewrite",
      "→ Question embedding",
      "→ Top-10 vector retrieval",
      "→ LLM reranking",
      "→ Top-5 context selection",
      "→ Grounded answer generation",
      "→ Inline citations and evidence display"
    ],
    "sourceIndexes": [
      239,
      240,
      241,
      242,
      243,
      244,
      245,
      246
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The Streamlit application explicitly executes these four stages in order and displays the active stage to the user while the answer is being produced."
      }
    ],
    "sourceIndexes": [
      247
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Observability and evaluation support",
    "sourceIndexes": [
      249
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application tracks token consumption separately across:"
      }
    ],
    "sourceIndexes": [
      250
    ]
  },
  {
    "type": "list",
    "ordered": true,
    "items": [
      [
        {
          "text": "query rewriting;"
        }
      ],
      [
        {
          "text": "retrieval embedding;"
        }
      ],
      [
        {
          "text": "reranking;"
        }
      ],
      [
        {
          "text": "answer generation."
        }
      ]
    ],
    "sourceIndexes": [
      251,
      252,
      253,
      254
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "It then calculates total prompt, completion, and overall token usage."
      }
    ],
    "sourceIndexes": [
      255
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This provides visibility into where model usage and cost occur."
      }
    ],
    "sourceIndexes": [
      256
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application also retains both the initially retrieved chunks and the final reranked chunks. This makes it possible to investigate questions such as:"
      }
    ],
    "sourceIndexes": [
      257
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "Did semantic retrieval find the correct passage?"
        }
      ],
      [
        {
          "text": "Did the reranker improve the ordering?"
        }
      ],
      [
        {
          "text": "Did an irrelevant chunk reach the answer-generation stage?"
        }
      ],
      [
        {
          "text": "Was the user’s question rewritten correctly?"
        }
      ],
      [
        {
          "text": "Did the model cite the passages it actually used?"
        }
      ],
      [
        {
          "text": "Was the failure caused by extraction, retrieval, reranking, or generation?"
        }
      ]
    ],
    "sourceIndexes": [
      258,
      259,
      260,
      261,
      262,
      263
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "That observability is particularly valuable when developing or evaluating a RAG system because an incorrect answer does not necessarily mean the language model failed. The issue may have occurred earlier in the pipeline."
      }
    ],
    "sourceIndexes": [
      264
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "3. What Problem Does It Solve, and What Is Its Purpose?",
    "sourceIndexes": [
      278
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "The core problem: important information is trapped inside documents",
    "sourceIndexes": [
      279
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Organizations frequently store critical knowledge in:"
      }
    ],
    "sourceIndexes": [
      280
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "employee handbooks;"
        }
      ],
      [
        {
          "text": "HR policies;"
        }
      ],
      [
        {
          "text": "onboarding guides;"
        }
      ],
      [
        {
          "text": "standard operating procedures;"
        }
      ],
      [
        {
          "text": "compliance documents;"
        }
      ],
      [
        {
          "text": "benefits guides;"
        }
      ],
      [
        {
          "text": "payroll documentation;"
        }
      ],
      [
        {
          "text": "technical manuals;"
        }
      ],
      [
        {
          "text": "project documentation;"
        }
      ],
      [
        {
          "text": "training material;"
        }
      ],
      [
        {
          "text": "contracts and process documents."
        }
      ]
    ],
    "sourceIndexes": [
      281,
      282,
      283,
      284,
      285,
      286,
      287,
      288,
      289,
      290,
      291
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "These files may contain the correct answer, but locating it often requires a person to know:"
      }
    ],
    "sourceIndexes": [
      292
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "which document to open;"
        }
      ],
      [
        {
          "text": "which section might contain the information;"
        }
      ],
      [
        {
          "text": "which terminology the document uses;"
        }
      ],
      [
        {
          "text": "whether the policy has related conditions elsewhere;"
        }
      ],
      [
        {
          "text": "whether the answer spans multiple pages or documents."
        }
      ]
    ],
    "sourceIndexes": [
      293,
      294,
      295,
      296,
      297
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The underlying problem is not information availability. The problem is "
      },
      {
        "text": "information accessibility",
        "strong": true
      },
      {
        "text": "."
      }
    ],
    "sourceIndexes": [
      298
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The RAG Knowledge Assistant converts passive documents into an interactive knowledge system."
      }
    ],
    "sourceIndexes": [
      299
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It reduces manual document search",
    "sourceIndexes": [
      300
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Without a RAG system, a user might need to:"
      }
    ],
    "sourceIndexes": [
      301
    ]
  },
  {
    "type": "list",
    "ordered": true,
    "items": [
      [
        {
          "text": "identify several potentially relevant files;"
        }
      ],
      [
        {
          "text": "open each file;"
        }
      ],
      [
        {
          "text": "search using multiple keywords;"
        }
      ],
      [
        {
          "text": "review every matching result;"
        }
      ],
      [
        {
          "text": "read the surrounding pages;"
        }
      ],
      [
        {
          "text": "combine information from multiple sections;"
        }
      ],
      [
        {
          "text": "verify whether the answer is current and accurate."
        }
      ]
    ],
    "sourceIndexes": [
      302,
      303,
      304,
      305,
      306,
      307,
      308
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The assistant replaces much of that process with a natural-language question."
      }
    ],
    "sourceIndexes": [
      309
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The user no longer needs to know the exact filename or wording used inside the document. Semantic retrieval searches by meaning rather than requiring an exact keyword match."
      }
    ],
    "sourceIndexes": [
      310
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It addresses the weaknesses of traditional keyword search",
    "sourceIndexes": [
      311
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Keyword search is useful when the user already knows the terminology used in the source."
      }
    ],
    "sourceIndexes": [
      312
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "It becomes less effective when:"
      }
    ],
    "sourceIndexes": [
      313
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "the question and document use different wording;"
        }
      ],
      [
        {
          "text": "the answer is expressed indirectly;"
        }
      ],
      [
        {
          "text": "relevant information is split across nearby pages;"
        }
      ],
      [
        {
          "text": "several documents contain the same keyword in different contexts;"
        }
      ],
      [
        {
          "text": "the user asks a conceptual rather than literal question."
        }
      ]
    ],
    "sourceIndexes": [
      314,
      315,
      316,
      317,
      318
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Embeddings address this by representing semantic meaning. The system can connect “vacation entitlement” with “paid annual leave,” or “expense repayment” with “reimbursement procedure,” even when the wording is different."
      }
    ],
    "sourceIndexes": [
      319
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The LLM-based reranker adds another layer of precision by distinguishing between passages that are merely related to the topic and passages that actually answer the question."
      }
    ],
    "sourceIndexes": [
      320
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It reduces ungrounded AI answers",
    "sourceIndexes": [
      321
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "A general chatbot may produce a fluent response without showing whether that answer came from the organization’s actual documents."
      }
    ],
    "sourceIndexes": [
      322
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "For internal policies, compliance guidance, employee benefits, and operational procedures, fluency is not enough. The answer must be verifiable."
      }
    ],
    "sourceIndexes": [
      323
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The RAG Knowledge Assistant addresses this through:"
      }
    ],
    "sourceIndexes": [
      324
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "retrieval from a controlled document collection;"
        }
      ],
      [
        {
          "text": "strict context-only generation instructions;"
        }
      ],
      [
        {
          "text": "source and page metadata;"
        }
      ],
      [
        {
          "text": "inline citations;"
        }
      ],
      [
        {
          "text": "visible evidence;"
        }
      ],
      [
        {
          "text": "an explicit refusal response when evidence is missing."
        }
      ]
    ],
    "sourceIndexes": [
      325,
      326,
      327,
      328,
      329,
      330
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Its purpose is therefore not simply to make an LLM answer questions. Its purpose is to make document-based answers more "
      },
      {
        "text": "grounded, explainable, and auditable",
        "strong": true
      },
      {
        "text": "."
      }
    ],
    "sourceIndexes": [
      331
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It supports conversational knowledge discovery",
    "sourceIndexes": [
      332
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Real information-seeking rarely happens through one perfectly written query."
      }
    ],
    "sourceIndexes": [
      333
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Users ask follow-up questions:"
      }
    ],
    "sourceIndexes": [
      334
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“Who is eligible?”"
      }
    ],
    "sourceIndexes": [
      335
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“How long does approval take?”"
      }
    ],
    "sourceIndexes": [
      336
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“Does that apply internationally?”"
      }
    ],
    "sourceIndexes": [
      337
    ]
  },
  {
    "type": "quote",
    "content": [
      {
        "text": "“Are there any exceptions?”"
      }
    ],
    "sourceIndexes": [
      338
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Because the application rewrites context-dependent questions before retrieval, users can explore a subject conversationally rather than repeatedly restating the entire topic."
      }
    ],
    "sourceIndexes": [
      339
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "This makes the experience closer to speaking with a knowledgeable internal subject-matter expert than using a document search box."
      }
    ],
    "sourceIndexes": [
      340
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "It improves trust through transparency",
    "sourceIndexes": [
      341
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "A system that returns only an answer asks the user to trust the model."
      }
    ],
    "sourceIndexes": [
      342
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "A system that returns an answer, source filename, page range, chunk ID, similarity score, reranking information, and pipeline details allows the user to evaluate the answer."
      }
    ],
    "sourceIndexes": [
      343
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application’s evidence panel and behind-the-scenes view serve several purposes:"
      }
    ],
    "sourceIndexes": [
      344
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "users can verify claims;"
        }
      ],
      [
        {
          "text": "developers can diagnose retrieval failures;"
        }
      ],
      [
        {
          "text": "stakeholders can understand how the answer was generated;"
        }
      ],
      [
        {
          "text": "evaluators can compare retrieval and reranking quality;"
        }
      ],
      [
        {
          "text": "the application can demonstrate responsible AI behavior."
        }
      ]
    ],
    "sourceIndexes": [
      345,
      346,
      347,
      348,
      349
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Its broader purpose",
    "sourceIndexes": [
      350
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The broader purpose of the project is to demonstrate how generative AI can be connected to a controlled organizational knowledge source."
      }
    ],
    "sourceIndexes": [
      351
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The application shows that a useful enterprise AI assistant requires more than placing a chat interface in front of a language model. It requires:"
      }
    ],
    "sourceIndexes": [
      352
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [
        {
          "text": "document processing;"
        }
      ],
      [
        {
          "text": "thoughtful chunking;"
        }
      ],
      [
        {
          "text": "semantic representation;"
        }
      ],
      [
        {
          "text": "vector search;"
        }
      ],
      [
        {
          "text": "conversational query handling;"
        }
      ],
      [
        {
          "text": "relevance reranking;"
        }
      ],
      [
        {
          "text": "constrained prompting;"
        }
      ],
      [
        {
          "text": "citation management;"
        }
      ],
      [
        {
          "text": "failure handling;"
        }
      ],
      [
        {
          "text": "session isolation;"
        }
      ],
      [
        {
          "text": "document lifecycle management;"
        }
      ],
      [
        {
          "text": "observability."
        }
      ]
    ],
    "sourceIndexes": [
      353,
      354,
      355,
      356,
      357,
      358,
      359,
      360,
      361,
      362,
      363,
      364
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The project combines these components into one end-to-end application."
      }
    ],
    "sourceIndexes": [
      365
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Potential organizational use cases",
    "sourceIndexes": [
      366
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The architecture can be adapted for several document-intensive scenarios."
      }
    ],
    "sourceIndexes": [
      367
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Human resources",
    "sourceIndexes": [
      368
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Employees could ask questions about benefits, paid time off, payroll, parental leave, performance reviews, immigration processes, and workplace policies."
      }
    ],
    "sourceIndexes": [
      369
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Employee onboarding",
    "sourceIndexes": [
      370
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "New hires could ask how to request system access, complete required training, submit documentation, or locate internal resources."
      }
    ],
    "sourceIndexes": [
      371
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Operations and standard procedures",
    "sourceIndexes": [
      372
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Teams could retrieve steps from SOPs, process manuals, quality procedures, and escalation guidelines."
      }
    ],
    "sourceIndexes": [
      373
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Compliance and governance",
    "sourceIndexes": [
      374
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Users could locate obligations, controls, approval requirements, reporting rules, and policy exceptions."
      }
    ],
    "sourceIndexes": [
      375
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Customer or technical support",
    "sourceIndexes": [
      376
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Support teams could query troubleshooting guides, product documentation, implementation manuals, and known-issue reports."
      }
    ],
    "sourceIndexes": [
      377
    ]
  },
  {
    "type": "heading",
    "level": 4,
    "text": "Project and consulting knowledge",
    "sourceIndexes": [
      378
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "Teams could ask questions across project documentation, requirements, delivery playbooks, lessons learned, and technical reference material."
      }
    ],
    "sourceIndexes": [
      379
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "One-paragraph project summary",
    "sourceIndexes": [
      386
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {
        "text": "The RAG Knowledge Assistant is a full-stack conversational Retrieval-Augmented Generation application built with Python, Streamlit, OpenAI, LangChain, and ChromaDB. Users upload PDF documents, which are processed through page-level extraction, adjacent-page context preservation, semantic chunking, embedding generation, duplicate detection, and persistent vector storage. When a question is asked, the system rewrites context-dependent follow-ups, retrieves the ten most semantically similar chunks, reranks them using an LLM, and sends the five strongest passages to a grounded answer-"
      },
      {
        "text": "generation prompt. The resulting response is limited to the uploaded document context, includes inline source citations, and can be audited through source, retrieval, reranking, response-time, and token-usage information. Its purpose is to reduce the friction of finding and interpreting knowledge contained in large document collections while improving the traceability and trustworthiness of AI-generated answers."
      }
    ],
    "sourceIndexes": [
      387
    ]
  }
];

export const ragCaseStudyOutline: RagCaseStudyOutlineEntry[] = (() => {
  const entries: RagCaseStudyOutlineEntry[] = [
    {
      id: "overview",
      label: "Overview",
      level: 1,
      ancestorIds: [],
    },
  ];
  const ancestors = new Map<number, string>();

  for (const block of ragCaseStudyBlocks) {
    if (block.type !== "heading") continue;

    const level = (block.level - 1) as 1 | 2 | 3;
    const id = createRagCaseStudyHeadingId(block.text);
    const ancestorIds = Array.from({ length: level - 1 }, (_, index) =>
      ancestors.get(index + 1),
    ).filter((ancestorId): ancestorId is string => Boolean(ancestorId));

    entries.push({
      id,
      label: block.text,
      level,
      ancestorIds,
    });
    ancestors.set(level, id);

    for (const ancestorLevel of [...ancestors.keys()]) {
      if (ancestorLevel > level) ancestors.delete(ancestorLevel);
    }
  }

  return entries;
})();
