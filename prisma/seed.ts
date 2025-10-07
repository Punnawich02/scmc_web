// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 🔑 สร้าง users หลายตัว
  const usersData = [
    { fname: "Admin", lname: "User", username: "admin", password: "admin123" },
    { fname: "Jane", lname: "Doe", username: "janedoe", password: "jane123" },
    { fname: "John", lname: "Doe", username: "johndoe", password: "john123" },
    { fname: "Punnawich", lname: "Dach-in", username: "punnawich", password: "12345678" },
  ];

  const users = [];
  for (const u of usersData) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.create({
      data: {
        fname: u.fname,
        lname: u.lname,
        username: u.username,
        password: passwordHash,
        isActive: true,
      },
    });
    console.log(`✅ User created: ${user.username} (${user.id})`);
    users.push(user);
  }

  // 📄 สร้าง DataPages หลายตัว
  const dataPagesData = [
    { name: "cmu_accident", categoryNameTh: "ข้อมูลการเกิดอุบัติเหตุใน มช.", categoryNameEn: "CMU Accident" },
    // { name: "Wind Energy", categoryNameTh: "พลังงานลม", categoryNameEn: "Wind Energy" },
    // { name: "Hydro Energy", categoryNameTh: "พลังงานน้ำ", categoryNameEn: "Hydro Energy" },
  ];

  const dataPages = [];
  for (const dp of dataPagesData) {
    const creator = users[0];
    const dataPage = await prisma.dataPage.create({
      data: {
        name: dp.name,
        categoryNameTh: dp.categoryNameTh,
        categoryNameEn: dp.categoryNameEn,
        embedCode: "<div class='tableauPlaceholder' id='viz1759811864938' style='position: relative'><noscript><a href='#'><img alt='ข้อมูลอุบัติเหตุภายในมหาวิทยาลัย ปี 2557 - ปัจจุบัน ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ac&#47;Accident_17206129265280&#47;Accident&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='Accident_17206129265280&#47;Accident' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ac&#47;Accident_17206129265280&#47;Accident&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1759811864938');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.minWidth='1209px';vizElement.style.maxWidth='1246px';vizElement.style.width='100%';vizElement.style.minHeight='1531px';vizElement.style.maxHeight='1631px';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.minWidth='1209px';vizElement.style.maxWidth='1246px';vizElement.style.width='100%';vizElement.style.minHeight='1531px';vizElement.style.maxHeight='1631px';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';} else { vizElement.style.width='100%';vizElement.style.height='3027px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>",
        createBy: creator.id,
      },
    });
    console.log(`✅ DataPage created: ${dataPage.name} (${dataPage.id})`);
    dataPages.push(dataPage);
  }

  // 📰 สร้าง Publications หลายตัว
  const publicationsData = [
    {
      titleTh: "งานวิจัยพลังงานแสงอาทิตย์",
      titleEn: "Solar Energy Research",
      descriptionTh: "บทความวิจัยเกี่ยวกับการใช้พลังงานแสงอาทิตย์ในประเทศไทย",
      descriptionEn: "A research article on solar energy utilization in Thailand",
      linkUrl: "https://example.com/publication/solar-energy",
    },
    {
      titleTh: "งานวิจัยพลังงานลม",
      titleEn: "Wind Energy Research",
      descriptionTh: "บทความวิจัยเกี่ยวกับการใช้พลังงานลมในประเทศไทย",
      descriptionEn: "A research article on wind energy utilization in Thailand",
      linkUrl: "https://example.com/publication/wind-energy",
    },
    {
      titleTh: "งานวิจัยพลังงานน้ำ",
      titleEn: "Hydro Energy Research",
      descriptionTh: "บทความวิจัยเกี่ยวกับการใช้พลังงานน้ำในประเทศไทย",
      descriptionEn: "A research article on hydro energy utilization in Thailand",
      linkUrl: "https://example.com/publication/hydro-energy",
    },
  ];

  for (const pub of publicationsData) {
    const creator = users[Math.floor(Math.random() * users.length)];
    const publication = await prisma.publications.create({
      data: {
        titleTh: pub.titleTh,
        titleEn: pub.titleEn,
        descriptionTh: pub.descriptionTh,
        descriptionEn: pub.descriptionEn,
        linkUrl: pub.linkUrl,
        createBy: creator.id,
      },
    });
    console.log(`✅ Publication created: ${publication.titleEn} (${publication.id})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
