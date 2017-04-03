(function(){
  'use strict';

  angular
    .module('app.landing')
    .controller('LandingController', LandingController);

  LandingController.$inject = [];

  function LandingController() {
    var landing = this;

    landing.testimonials = [
      {
        id: 1,
        name: "คุณ วรมัน แจ้งชัด",
        text: "ตอนนั้นคุณพ่อหกล้ม เกิดกระดูกสันหลังหัก ตอนนั้นทำอะไรไม่ถูกเลย เพราะไม่รู้จะให้ใครช่วยดูแลในช่วงที่เราต้องทำงาน ขอบคุณ Health at Home ที่ช่วยส่งพยาบาลมาช่วยดูแลคุณพ่อ ในช่วงที่ทุกอย่างยังไม่ลงตัว จนผ่านช่วงเวลานั้นไปได้",
        position: "ประธานเจ้าหน้าที่บริหาร (CEO)",
        company: "KIT Solution and Technology",
        url: "http://www.kits.in.th/",
        imageUrl: "assets/images/landing/testimonial-01.jpg"
      },
      {
        id: 2,
        name: "คุณ พูลศิริ วิโรจนาภา",
        text: "ได้รับการดูแลเอาใจใส่เป็นอย่างดี คุณแม่ก็ได้คุณพยาบาลที่น่ารักมาดูแล ขอบคุณ Health at Home ค่ะ",
        position: "รองกรรมการผู้อำนวยการใหญ่สายบัญชี การเงิน และ CFO",
        company: "บริษัท ท่าอากาศยานไทย จำกัด (มหาชน) - AOT",
        imageUrl: "assets/images/landing/testimonial-02.jpg"
      },
    ];

  }

})();