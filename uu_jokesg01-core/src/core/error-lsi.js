const Lsi = {
  defaultError: {
    cs: "Omlouváme se, opravdu nevíme, co se stalo. Pokud problém přetrvává, nahlašte prosím chybu na helpdesk.",
    en:
      "Sorry, we really do not known what could have gone wrong. If the problem persists please send an issue to helpdesk.",
  },
  badRequest: {
    cs: "Omlouváme se, během zpracování požadavku nastala chyba.",
    en: "Sorry, something went wrong while processing your request.",
  },
  unauthorized: {
    cs:
      "Nemáte přístupová práva. Pokud si myslíte, že jde o chybu, kontaktujte prosím kompetentní osobu nebo pošlete požadavek na helpdesk.",
    en:
      "You are not authorized. If you think this is a mistake, please contact competent person or send issue to helpdesk.",
  },
  forbidden: {
    cs:
      "Nemáte přístupová práva. Pokud si myslíte, že jde o chybu, kontaktujte prosím kompetentní osobu nebo pošlete požadavek na helpdesk.",
    en:
      "You are not authorized. If you think this is a mistake, please contact competent person or send issue to helpdesk.",
  },
  notFound: {
    cs: "Požadavek nemohl být zpracován. Zkontrolujte prosím zadané URL.",
    en: "Request is invalid. Please check provided URL.",
  },
  internal: {
    cs: "Nastala neočekávaná chyba. Opakujte požadavek a případně nahlašte problém na helpdesk.",
    en: "Internal error occured. Please try again and if the problem persists send an issue to helpdesk.",
  },
  serviceUnavailable: {
    cs: "Služba není momentálně dostupná, zkuste to prosím později.",
    en: "Service is currently unavailable. Please try again later.",
  },
  requestTimeout: {
    cs: "Čas pro komunikaci se serverem vypršel. Zkuste to prosím později.",
    en: "Request timeout. Please try again later.",
  },
  baseNetworkError: {
    cs: "Chyba sítě - požadovaný zdroj není k dispozici a nebo neexistuje.",
    en: "Network error - resource is not available or does not exist.",
  },
  "uu-gateway-main/invalidRequest": {
    cs: "Požadavek nemohl být zpracován. Zkontrolujte prosím zadané URL.",
    en: "Request is invalid. Please check provided URL.",
  },
  "uu-app-workspace/forbiddenAwidSysState": {
    cs:
      "Workspace aplikace není v aktivním stavu a pravděpodobně na něm probíhá údržba. Zkuste to prosím znovu později.",
    en: "Application workspace is not in active state and is probably under maintenance. Please try again later.",
  },
  "uu-app-workspace/forbiddenAsidSysState": {
    cs: "Instance aplikace není v aktivním stavu a pravděpodobně probíhá údržba. Zkuste to prosím znovu později.",
    en: "Application instance is not in active state and is probably under maintenance. Please try again later.",
  },
};

export default Lsi;
