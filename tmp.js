step1() {
   console.log("Starting an algo")
   const algorithmResult = "algoResult"
   yield

   yield* step2()
   yield* step3()
   console.log("Ended alghorithm")
}

step2() {
   console.log("Some actions in second step");
   const step2Result = "step2Result"
   yield step2Result
}

step3() {
   console.log("Some actions in last step")
   yield "Step 3 result"
}
