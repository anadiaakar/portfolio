export type TimelineType = "job" | "project";

export type FilterTech =
  | "Backend"
  | "Frontend"
  | "Cloud"
  | "Kubernetes"
  | "Data"
  | "Databases"
  | "Messaging"
  | "Realtime"
  | "ML";

export type TimelineItem = {
  id: string;
  type: TimelineType;

  // Timeline placement
  startDate: string; // "YYYY-MM"
  endDate?: string;

  // Display
  title: string;
  org?: string; 
  summary: string;
  location?: string;

 
  tech: string[];
  filterTech?: FilterTech[];
  links?: { label: string; href: string }[];

  // Relationships
  jobId?: string; 

  // Detail / case study
  highlights?: string[];
  problem?: string;
  solution?: string;
  impact?: string[];
};

export const timeline: TimelineItem[] = [
  // =========================
  // VVDN
  // =========================
  {
    id: "job-vvdn",
    type: "job",
    startDate: "2020-08",
    endDate: "2022-09",
    title: "Software Engineer",
    org: "VVDN Technologies",
    location: "Gurugram, India",
    summary:
      "Built Python-based hardware test automation and a distributed production test framework (server + client agents) used in board/box-level testing workflows.",
    tech: [
      "Python",
      "Linux",
      "PySerial",
      "Bash",
      "Django",
      "AJAX",
      "HTML",
      "CSS",
      "WebSockets",
      "Git",
      "Google APIs",
      "RabbitMQ",
    ],
    filterTech: ["Backend", "Realtime"],
    highlights: [
      "Automated board-level and box-level hardware testing using Python (pyserial) on Linux, with Bash utilities where needed.",
      "Developed a distributed production test framework: centralized server orchestrating multiple IP-bound clients via APIs and client-side Python service.",
      "Implemented stage gating (only allowed stages per client IP) with device scanning and stage dependency checks to prevent invalid progression.",
      "Built role-based portals (admin/operator/line-lead/shipping) with real-time pass/fail updates via WebSockets.",
      "Explored RabbitMQ as an alternative to API-driven orchestration to improve reliability and decouple client execution.",
    ],
  },
  {
    id: "proj-vvdn-hw-automation",
    type: "project",
    startDate: "2020-08",
    endDate: "2022-01",
    title: "Hardware Test Automation Scripting (Board/Box Level)",
    org: "VVDN Technologies",
    summary:
      "Automated communication and validation for hardware devices during board-level and box-level testing using Python serial tooling on Linux.",
    tech: ["Python", "Linux", "PySerial", "Bash"],
    filterTech: ["Backend"],
    jobId: "job-vvdn",
    problem:
      "Manual device testing and serial communication steps were slow, inconsistent, and error-prone during production validation.",
    solution:
      "Built Python scripts using pyserial to interact with devices over serial interfaces, validate responses, and standardize repeatable test flows on Linux; added Bash helpers for station setup and tooling.",
    highlights: [
      "Implemented serial I/O workflows for device bring-up and test execution.",
      "Standardized scripts to be repeatable across operators and test stations.",
    ],
    impact: [
      "Reduced manual steps during device testing and improved repeatability across stations.",
      "Lowered operator error and increased confidence in board/box validation outcomes.",
    ],
  },
  {
    id: "proj-vvdn-pro-test-framework",
    type: "project",
    startDate: "2021-02",
    endDate: "2022-09",
    title: "Distributed Production Test Framework (Server + Client Agents)",
    org: "VVDN Technologies",
    summary:
      "Built a server-orchestrated testing system where IP-bound client stations automatically pulled test repos, executed cases via a Python service, and returned logs/results.",
    tech: ["Python", "Django", "AJAX", "HTML", "CSS", "Git", "Linux"],
    filterTech: ["Backend", "Realtime"],
    jobId: "job-vvdn",
    problem:
      "Production testing needed centralized control (stage gating, device tracking, traceability) while supporting many distributed client stations reliably.",
    solution:
      "Implemented a Django-based server coordinating multiple clients by IP. On device scan, the system validated stage prerequisites, marked status in-progress, deployed a cloned Git test repository to the correct client, executed tests via a resident Python service, and collected logs/results back to the server.",
    highlights: [
      "Server enforced stage gating per IP (only allowed stages can run on that station).",
      "Device scan flow checked whether prior stages passed before allowing progression.",
      "Linked board serial numbers to box serial numbers at a defined stage.",
      "Client-side Python service polled for in-progress work for that station/IP and ran the test suite.",
      "Centralized log capture and result storage per device/stage.",
    ],
    impact: [
      "Enabled controlled, repeatable production testing across multiple stations with centralized governance.",
      "Improved traceability through consistent stage prerequisites and centralized results/log collection.",
    ],
  },
  {
    id: "proj-vvdn-portals-realtime",
    type: "project",
    startDate: "2021-02",
    endDate: "2022-09",
    title: "Admin + Operator Portals with Real-time Test Status",
    org: "VVDN Technologies",
    summary:
      "Created role-based portals for admin/operator/line-lead workflows and added real-time pass/fail updates to improve visibility on the shop floor.",
    tech: ["Django", "AJAX", "HTML", "CSS", "WebSockets", "Google APIs"],
    filterTech: ["Frontend", "Realtime"],
    jobId: "job-vvdn",
    problem:
      "Operators and supervisors needed immediate visibility into test status and stage performance without manual refresh or delayed updates.",
    solution:
      "Built role-based portals (admin/operator/line-lead/shipping) and used WebSockets to push in-progress and pass/fail updates live; integrated graphing via Google APIs for stage-level and overall performance views.",
    highlights: [
      "Admin portal: stage-level and overall performance graphs.",
      "Operator portal: stage execution UI; line-lead role to assign operators by stage and station IP.",
      "Live updates: WebSockets for immediate feedback on test outcomes.",
      "Shipping portal: linked master box → device → shipment/consignment with role-based workflows.",
    ],
    impact: [
      "Reduced time-to-visibility for test outcomes and improved on-floor coordination.",
      "Improved operational control through role-based assignments and clearer stage ownership.",
    ],
  },
  {
    id: "proj-vvdn-rabbitmq-poc",
    type: "project",
    startDate: "2022-06",
    endDate: "2022-09",
    title: "RabbitMQ Orchestration Proof-of-Concept",
    org: "VVDN Technologies",
    summary:
      "Explored RabbitMQ-based orchestration as an alternative to API-driven coordination to decouple server/client execution.",
    tech: ["RabbitMQ", "Python"],
    filterTech: ["Messaging", "Backend"],
    jobId: "job-vvdn",
    problem:
      "API-based orchestration can be tightly coupled and less resilient when clients/stations are intermittently connected or under load.",
    solution:
      "Prototyped message-queue based task dispatch and result collection between server and client agents to reduce polling, decouple execution, and improve reliability.",
    highlights: [
      "Compared API polling vs queued task dispatch for test execution flows.",
      "Evaluated decoupling benefits for client reliability and server load.",
    ],
    impact: [
      "Demonstrated a more resilient orchestration option and documented tradeoffs vs API polling.",
    ],
  },

  // =========================
  // AFOUR
  // =========================
  {
    id: "job-afour-web-dev",
    type: "job",
    startDate: "2022-09",
    endDate: "2024-02",
    title: "Software Development Engineer",
    org: "AFOUR Technologies",
    location: "Pune, India",
    summary:
      "Built PySpark pipelines to centralize analytics data; developed Snowflake monitoring dashboards; containerized and deployed workloads with CI/CD.",
    tech: ["Python", "PySpark", "Snowflake", "Docker", "Azure Pipelines", "Monitoring", "Dashboards"],
    filterTech: ["Data", "Cloud", "Databases"],
    highlights: [
      "Built PySpark data pipelines to centralize analytics data for reliability and observability.",
      "Developed Snowflake account monitoring dashboards to identify heavy queries and compute cost bottlenecks.",
      "Containerized and deployed workloads; unified build/deployment practices via CI/CD.",
    ],
  },
  {
    id: "proj-afour-datalake-pyspark",
    type: "project",
    startDate: "2022-09",
    endDate: "2023-06",
    title: "Org-wide Data Centralization into a Data Lake",
    org: "AFOUR Technologies",
    summary:
      "Implemented PySpark pipelines to aggregate data from multiple sources into a central analytics lake for reporting and observability.",
    tech: ["Python", "PySpark", "ETL", "Data Engineering"],
    filterTech: ["Data", "Databases", "Cloud"],
    jobId: "job-afour-web-dev",
    problem:
      "Org data was fragmented across systems and databases, making analytics inconsistent, hard to trust, and expensive to reconcile.",
    solution:
      "Built PySpark ETL pipelines to ingest, transform, and centralize data into a single analytics lake with standardized schemas and repeatable ingestion flows.",
    impact: [
      "Improved consistency of analytics by consolidating fragmented sources into a single lake.",
      "Reduced time spent reconciling data across teams through standardized ingestion and transformation.",
    ],
  },
  {
    id: "proj-afour-snowflake-monitoring",
    type: "project",
    startDate: "2023-06",
    endDate: "2024-02",
    title: "Snowflake Cost & Query Bottleneck Monitoring Dashboard",
    org: "AFOUR Technologies",
    summary:
      "Built a web app to monitor Snowflake metrics (compute costs, heavy queries) to identify and reduce bottlenecks; deployed via Azure Pipelines.",
    tech: ["Python", "Snowflake", "Azure Pipelines", "Monitoring", "Dashboards", "Web Analytics"],
    filterTech: ["Data", "Cloud", "Databases"],
    jobId: "job-afour-web-dev",
    problem:
      "Teams needed clear visibility into Snowflake performance and cost drivers to control spend and reduce slow query bottlenecks.",
    solution:
      "Implemented monitoring dashboards and analytics views around Snowflake usage metrics (compute, query hotspots) and automated build/deploy via Azure Pipelines.",
    impact: [
      "Improved cost awareness by surfacing compute utilization and heavy-query patterns.",
      "Accelerated delivery and release reliability through CI/CD automation.",
    ],
  },

  // =========================
  // Revmax
  // =========================
  {
    id: "job-revmax-backend",
    type: "job",
    startDate: "2024-02",
    endDate: "2024-08",
    title: "Software Developer",
    org: "Revmax Technologies",
    location: "Delhi, India",
    summary:
      "Built real-time backend systems for a coupon auction app: Kafka/Redis pipelines, websocket updates, queue-based automation, and scaling strategies for peak bidding.",
    tech: ["Python", "Flask", "Kafka", "Redis", "PostgreSQL", "WebSockets", "Redis RQ", "Faust", "Rate Limiting"],
    filterTech: ["Backend", "Realtime", "Messaging", "Databases"],
    highlights: [
      "Engineered Kafka + Redis + PostgreSQL pipelines to reduce API latency and improve throughput.",
      "Implemented websocket-driven live updates for bidding events.",
      "Designed elastic auction room partitioning to handle peak loads without cross-room visibility.",
      "Added IP-based rate limiting to mitigate abusive traffic and improve resilience.",
    ],
  },
  {
    id: "proj-revmax-realtime-auction",
    type: "project",
    startDate: "2024-02",
    endDate: "2024-08",
    title: "Real-time Coupon Auction Backend",
    org: "Revmax Technologies",
    summary:
      "Built websocket + queue driven auction backend with Kafka/Redis orchestration for live bidding and automated job execution.",
    tech: ["Python", "Flask", "WebSockets", "Kafka", "Redis", "Redis RQ", "Faust", "PostgreSQL"],
    filterTech: ["Backend", "Realtime", "Messaging", "Databases"],
    jobId: "job-revmax-backend",
    problem:
      "Live auctions require low-latency bid updates across many users while handling scheduled traffic spikes without overloading the request path.",
    solution:
      "Implemented websocket broadcasting for real-time updates, backed by queue/stream processing using Kafka + Redis. Used Redis RQ + Faust to run background workflows and automation without blocking core API flows.",
    highlights: [
      "Websocket broadcasting for bid updates and state changes.",
      "Queue-based automation via Redis RQ and event handling via Faust.",
      "Kafka used for event flow / queueing where needed to stabilize load.",
    ],
    impact: [
      "Maintained responsive live bidding by moving heavy work off the synchronous request path.",
      "Improved throughput and stability during scheduled auction spikes through event-driven processing.",
    ],
  },
  {
    id: "proj-revmax-room-sharding",
    type: "project",
    startDate: "2024-04",
    endDate: "2024-08",
    title: "Elastic Auction Room Sharding for Peak Traffic",
    org: "Revmax Technologies",
    summary:
      "Auto-partitioned bidders into isolated rooms when demand exceeded capacity; scaled to N rooms to sustain peak events.",
    tech: ["Python", "Flask", "Redis", "WebSockets"],
    filterTech: ["Backend", "Realtime"],
    jobId: "job-revmax-backend",
    problem:
      "Scheduled auctions caused sudden surges where a single room could not handle all users without performance degradation.",
    solution:
      "Implemented dynamic room partitioning: users were placed into multiple isolated rooms with separate bid visibility, scaling room count based on load.",
    impact: [
      "Sustained peak-time events by distributing load across rooms (no cross-room bid/user visibility).",
      "Enabled scaling to N rooms based on participant count, improving stability at peak.",
    ],
  },
  {
    id: "proj-revmax-rate-limiting",
    type: "project",
    startDate: "2024-06",
    endDate: "2024-08",
    title: "Abuse Mitigation via IP-based Rate Limiting",
    org: "Revmax Technologies",
    summary:
      "Added request limiting controls to reduce impact from abusive traffic and protect core auction flows.",
    tech: ["Python", "Flask", "Rate Limiting"],
    filterTech: ["Backend"],
    jobId: "job-revmax-backend",
    problem:
      "Abusive traffic patterns (including attack-like bursts) threatened availability and could degrade auction integrity.",
    solution:
      "Added IP-based request limiting policies and tuned thresholds to protect critical endpoints while preserving normal user flows; monitored and adjusted rules based on observed traffic.",
    highlights: [
      "Implemented IP-based request limiting policies to reduce blast radius during abnormal traffic spikes.",
      "Focused protection on critical auction endpoints to preserve bidding stability.",
    ],
    impact: [
      "Reduced attack blast radius and improved service stability during abnormal traffic spikes.",
      "Helped maintain auction availability during peak events by preventing overload from abusive clients.",
    ],
  },

  // =========================
  // SMS Group
  // =========================
  {
    id: "job-sms-intern",
    type: "job",
    startDate: "2025-05",
    endDate: "2025-08",
    title: "Software Development Intern",
    org: "SMS Group",
    location: "Pittsburgh, PA",
    summary:
      "Delivered React + C# features for manufacturing clients on Azure/Kubernetes; acted as DRI for live deployments and incident response.",
    tech: ["React", "TypeScript", "C#", "REST APIs", "Kubernetes", "Azure Pipelines", "Webpack", "Tailwind"],
    filterTech: ["Frontend", "Backend", "Cloud", "Kubernetes"],
    highlights: [
      "Built production features across React + C# services; improved UI responsiveness and reduced defects.",
      "Served as DRI monitoring live deployments and resolving incidents during high-load production windows.",
      "Used Module Federation to unify multiple client apps under one experience; evaluated SSR but shipped CSR due to constraints.",
    ],
  },
  {
    id: "proj-sms-module-federation-portal",
    type: "project",
    startDate: "2025-05",
    endDate: "2025-08",
    title: "Unified Manufacturing Portal via Module Federation",
    org: "SMS Group",
    summary:
      "Consolidated multiple plant-facing apps into one UI using Module Federation and client-side rendering across dev/stage/prod environments.",
    tech: ["React", "TypeScript", "C#", "Kubernetes", "Azure Pipelines", "Webpack", "Tailwind", "Module Federation"],
    filterTech: ["Frontend", "Cloud", "Kubernetes"],
    jobId: "job-sms-intern",
    problem:
      "Customers had separate applications for different plant workflows, creating friction, duplicated navigation, and inconsistent experiences.",
    solution:
      "Built a unified portal using Module Federation: integrated independent modules into a single shell app, standardized environment handling across dev/stage/prod, and shipped client-side rendering after evaluating SSR constraints.",
    highlights: [
      "Integrated independently developed modules into one shell app.",
      "Standardized environment and release workflow for dev/stage/prod.",
      "Validated SSR feasibility; shipped CSR due to constraints and timelines.",
    ],
    impact: [
      "Reduced context switching by consolidating multiple plant apps into one portal.",
      "Improved release hygiene across environments by standardizing module loading and environment handling.",
    ],
  },

  // =========================
  // ASU TA
  // =========================
  {
    id: "job-asu-ta",
    type: "job",
    startDate: "2025-08",
    title: "Teaching Assistant / Grader",
    org: "Arizona State University",
    location: "Tempe, AZ",
    summary:
      "Supported 100+ students across multiple courses via office hours, debugging sessions, and grading with structured feedback.",
    tech: ["Python", "Java", "Scheme", "Prolog", "Networking", "ML Foundations"],
    filterTech: ["Backend", "ML"],
    highlights: [
      "Led office hours and debugging sessions; improved student conceptual clarity and assignment performance.",
      "Graded programming projects and gave feedback on correctness, style, and problem-solving approach.",
    ],
  },

  // =========================
  // Projects (Club + ML)
  // =========================
  {
    id: "proj-csplus-job-board",
    type: "project",
    startDate: "2024-08",
    endDate: "2025-03",
    title: "CS+ ASU Club Job Board Platform",
    org: "CS+ ASU Club",
    location: "Tempe, AZ",
    summary:
      "Led a 12-person team to deliver a scalable job board platform (newsletters, events, job postings) aligned to user needs and club goals.",
    tech: ["React", "TypeScript", "REST APIs", "PostgreSQL", "UI/UX"],
    filterTech: ["Frontend", "Backend", "Databases"],
    problem:
      "The club needed a single reliable platform for job postings, newsletters, and events instead of scattered links and manual coordination.",
    solution:
      "Led a 12-person team to translate needs into shippable features. Designed a clean API + database-backed content model and optimized query flows for a responsive UI and maintainable admin workflows.",
    highlights: [
      "Led a team of 12 and clarified requirements into shippable features (newsletters, events, job posts).",
      "Designed REST APIs and optimized query flows for responsive UI/UX and reliable performance.",
    ],
    impact: [
      "Created a single hub for jobs and club updates, reducing manual overhead for coordination.",
      "Improved discoverability and engagement through structured content and responsive UI flows.",
    ],
    links: [
      // add later if you want
      // { label: "GitHub", href: "..." },
      // { label: "Demo", href: "..." },
    ],
  },
  {
    id: "proj-multimodal-fake-job-postings",
    type: "project",
    startDate: "2025-08",
    endDate: "2025-12",
    title: "Multimodal Fake vs Real Job Posting Classification",
    org: "Arizona State University",
    location: "Tempe, AZ",
    summary:
      "Built an explainable tri-modal classifier using text, company-logo images, and structured metadata with fusion strategies and XAI.",
    tech: [
      "Python",
      "PyTorch",
      "BERT",
      "ResNet-50",
      "TF-IDF",
      "SHAP",
      "Grad-CAM",
      "Integrated Gradients",
    ],
    filterTech: ["ML", "Backend"],
    problem:
      "Text-only classifiers miss important signals; fake postings can appear legitimate in one modality but inconsistent across text, images, and metadata.",
    solution:
      "Built a tri-modal pipeline combining text (BERT), images (ResNet-50), and structured metadata with fusion layers; added explainability using SHAP, Grad-CAM, and Integrated Gradients to validate model behavior and debug failures.",
    highlights: [
      "Implemented fusion approaches across modalities and evaluated under class imbalance (ROC–AUC / PR–AUC).",
      "Added explainability across modalities using SHAP and attribution-based methods.",
    ],
    impact: [
      "Delivered strong discrimination under imbalance using ROC–AUC / PR–AUC and produced explanations to support trust and debugging.",
      "Improved interpretability by attributing which features and regions influenced decisions across modalities.",
    ],
    // links: [{ label: "GitHub", href: "..." }],
  },
];
