export const getBase64ImageFromURL = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };


  export const transactions=[
    {
      phoneNumber: "+250790183836",
      serviceType: "MOMO",
      amount: 150,
      type: "CREDIT",
      balance: 130,
      date: "2024-04-10T12:00:00Z",
    },
    {
      phoneNumber: "+250790183836",
      serviceType: "MOMO",
      amount: 120,
      type: "CREDIT",
      balance: 100,
      date: "2024-05-15T09:30:00Z",
    },
    {
      phoneNumber: "+250790183836",
      serviceType: "BANK",
      amount: 110,
      type: "CREDIT",
      balance: 90,
      date: "2024-06-05T14:30:00Z",
    },
    {
      phoneNumber: "+250790183836",
      serviceType: "BANK",
      amount: 130,
      type: "CREDIT",
      balance: 100,
      date: "2024-07-25T10:00:00Z",
    },
    {
      phoneNumber: "+250790183836",
      serviceType: "MOMO",
      amount: 140,
      type: "CREDIT",
      balance: 110,
      date: "2024-08-14T08:15:00Z",
    },
    {
      phoneNumber: "+250790183836",
      serviceType: "MOMO",
      amount: 120,
      type: "CREDIT",
      balance: 90,
      date: "2024-09-05T16:20:00Z",
    },
    {
      phoneNumber: "+250789654321",
      serviceType: "BANK",
      amount: 90,
      type: "CREDIT",
      balance: 60,
      date: "2024-05-20T10:00:00Z",
    },
    {
      phoneNumber: "+250789654321",
      serviceType: "MOMO",
      amount: 50,
      type: "DEBIT",
      balance: 20,
      date: "2024-06-18T14:15:00Z",
    },
    {
      phoneNumber: "+250788112233",
      serviceType: "TAX",
      amount: 60,
      type: "DEBIT",
      balance: 50,
      date: "2024-08-01T09:45:00Z",
    },
    {
      phoneNumber: "+250788112233",
      serviceType: "BANK",
      amount: 200,
      type: "CREDIT",
      balance: 150,
      date: "2024-09-03T11:30:00Z",
    },
    {
      phoneNumber: "+250788998877",
      serviceType: "MOMO",
      amount: 100,
      type: "CREDIT",
      balance: 75,
      date: "2024-04-05T12:45:00Z",
    },
    {
      phoneNumber: "+250788998877",
      serviceType: "MOMO",
      amount: 120,
      type: "CREDIT",
      balance: 100,
      date: "2024-05-15T09:30:00Z",
    },
  ];